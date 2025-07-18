const router = require('express').Router();
const { Announcement, Student } = require('../../db/models');
const { sendEmail } = require('../../utils/mailer');

// Add new announcement
router.post('/', async (req, res) => {
  try {
    const { subject, msg } = req.body;
    console.log('req.body: ', req.body)
    // Create announcement
    const announcement = await Announcement.create({ subject, msg });

    // Get all student emails
    const students = await Student.findAll({ attributes: ['email'] });
    const emailList = students.map(student => student.email);

    // Send email
    await sendEmail(emailList, subject, msg);

    return res.json({ announcement, emailStatus: "Emails sent" });
  } catch (err) {
    console.error("Error in POST /api/announcement:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;


// const router = require('express').Router();
// const {Announcement} = require('../../db/models');
// // Add new announcement
// router.post('/', async (req, res) => {
//     console.log('req.body: ', req.body);
//     const {subject, message} = req.body;
//     const announcement = await Announcement.create({subject,msg:message});
//     return res.json({announcement})
// })

// module.exports = router;