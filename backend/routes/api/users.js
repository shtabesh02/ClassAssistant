const express = require('express')

const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');


const router = express.Router();


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');





const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('username')
    .notEmpty()
    .withMessage('Username is required'),
  check('firstName')
    .notEmpty()
    .withMessage('First Name is required'),
  check('lastName')
    .notEmpty()
    .withMessage('Last Name is required'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      // Check if the users already exists

      const existingEmail = await User.findOne({where: {email}});
      const existingUsername = await User.findOne({where: {username}});

      if(existingEmail){
        return res.status(500).json({
          "message": "User already exists",
          "errors": {
            "email": "User with that email already exists"
          }
        });
      }

      if(existingUsername){
        return res.status(500).json({
          "message": "User already exists",
          "errors": {
            "username": "User with that username already exists"
          }
        });
      }
      const user = await User.create({ username, email, hashedPassword, firstName, lastName});
  
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        // hashedPassword: user.hashedPassword,
      };

      await setTokenCookie(res, safeUser);

      return res.status(200).json({
        user: safeUser
      });
    }
  );
  

module.exports = router;