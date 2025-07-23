const router = require('express').Router();
const {Student} = require('../../db/models');

router.get('/', async (req, res) => {
    const students = await Student.findAll();
    // console.log('students from db: ', students)
    const formattedStudents = students.map( student => ({
        id: student.dataValues.id,
        firstName: student.dataValues.first_name,
        lastName: student.dataValues.last_name,
        email: student.dataValues.email
    }))
    console.log('student formatted: ', formattedStudents)
    return res.status(200).json(formattedStudents);
});
module.exports = router;