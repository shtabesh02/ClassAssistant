const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.use(express.json());

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email or username is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];

// Login
router.post('/', validateLogin, async (req, res, next) => {
  console.log('req.body from session api: ', req.body)
    const { credential, password } = req.body;

    // console.log('cred: ', credential)
    const user = await User.unscoped().findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
      // const err = new Error('Login failed');
      const err = {
        message: "Invalid credentials"
      };
      // err.status = 401;
      // err.title = 'Login failed';
      // err.errors = { credential: 'The provided credentials were invalid.' };
      return res.status(401).json(err)
    }

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.status(200).json({
      user: safeUser
    });
  }
);



// Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);


// Restore session user
router.get('/', (req, res) => {
      const { user } = req;
      if (user) {
        const safeUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
        };
        return res.status(200).json({
          user: safeUser
        });
      } else return res.status(200).json({ user: null });
    }
  );

  
module.exports = router;