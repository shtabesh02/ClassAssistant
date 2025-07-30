const router = require('express').Router();
const { Assignment } = require('../../db/models');

router.get('/', async (req, res) => {
    const assignments = await Assignment.findAll();
    // console.log('Assignment from db: ', assignments);
    res.status(200).json(assignments);
});

module.exports = router;