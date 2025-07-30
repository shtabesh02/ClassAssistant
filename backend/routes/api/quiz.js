const router = require('express').Router();
const { Quiz } = require('../../db/models');
router.get('/', async (req, res) => {
    const quizzes = await Quiz.findAll();
    // console.log('Quiz from db: ', quizzes)
    res.status(200).json(quizzes);
});
module.exports = router;