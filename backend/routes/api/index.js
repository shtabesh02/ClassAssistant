// backend/routes/api/index.js

const express = require('express');
const { Op, where } = require('sequelize');
const bcrypt = require('bcryptjs');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { sequelize } = require('sequelize');


const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking, Sequelize } = require('../../db/models');

const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const announcementRouter = require('./announcement.js');
const studentRouter = require('./students.js');
const quizRouter = require('./quiz.js');
const assignmentRouter = require('./assignment.js');

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/announcement', announcementRouter);
router.use('/students', studentRouter);
router.use('/quiz', quizRouter);
router.use('/assignment', assignmentRouter);

// Test the API router
router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });
});


// GET /api/set-token-cookie
// const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

// GET /api/restore-user

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

// GET /api/require-auth

router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

module.exports = router;