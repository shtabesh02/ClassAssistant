const router = require('express').Router();
const {Student} = require('../../db/models');
const xlsx = require('xlsx');
const multer = require('multer');
router.get('/', async (req, res) => {
    const students = await Student.findAll();
    // console.log('students from db: ', students)
    const formattedStudents = students.map( student => ({
        id: student.dataValues.id,
        firstName: student.dataValues.first_name,
        lastName: student.dataValues.last_name,
        email: student.dataValues.email
    }))
    // console.log('student formatted: ', formattedStudents)
    return res.status(200).json(formattedStudents);
});

const upload = multer({storage: multer.memoryStorage()});
router.post('/import', upload.single('file'), async (req, res) => {
    // console.log('import hit the database.')
    // console.log('req.bod: ', req.file)
    if(!req.file) return res.status(400).json({error: 'No file uploaded.'});

    const workbook = xlsx.read(req.file.buffer, {type: 'buffer'});
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // console.log('extracted data: ', data)
    const formattedStudents = data.map(row => ({
        first_name: row.first_name,
        last_name: row.last_name,
        email: row.email
    }));

    // empty the table first
    await Student.destroy({
        where: {},
        truncate: true,
        cascade: true
    });

    const updatedList = await Student.bulkCreate(formattedStudents, {
        ignoreDuplicates: true
    });

    res.status(200).json({
        message: `imported ${formattedStudents.length} students successfully.`,
        students: updatedList
    })
});
module.exports = router;