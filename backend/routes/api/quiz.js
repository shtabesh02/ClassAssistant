const express = require('express');
const router = require('express').Router();
const { Quiz } = require('../../db/models');

router.get('/', async (req, res) => {
    const quizzes = await Quiz.findAll();
    // console.log('Quiz from db: ', quizzes)
    res.status(200).json(quizzes);
});

router.post('/', express.json(), async (req, res) => {
    console.log('req.body quiz: ', req.body);
    const {title, dueDate, description} = req.body;
    const newQuiz = await Quiz.create({title, due_date: dueDate, description});
    res.status(200).json(newQuiz);
});
module.exports = router;