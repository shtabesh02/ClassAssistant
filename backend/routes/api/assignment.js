const express = require('express');
const router = require('express').Router();
const { Assignment } = require('../../db/models');

router.get('/', async (req, res) => {
    const assignments = await Assignment.findAll();
    // console.log('Assignment from db: ', assignments);
    res.status(200).json(assignments);
});

router.post('/', express.json(), async (req, res) => {
    console.log('req.body: ', req.body)
    const {title, dueDate, description} = req.body;
    const newAssignment = await Assignment.create({title, due_date: dueDate, description});
    res.status(200).json(newAssignment);
});

module.exports = router;