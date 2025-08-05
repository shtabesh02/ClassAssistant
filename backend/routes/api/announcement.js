const router = require('express').Router();
const { Announcement, Student } = require('../../db/models');
const { sendEmail } = require('../../utils/mailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer
const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb){
    cb(null, Date.now() + '_' + file.originalname);
  }
});
const upload = multer({storage});

// Add new announcement
router.post('/', upload.array('attachments'), async (req, res) => {
  try {
    const { subject, msg } = req.body;
    // console.log('req.body: ', req.body)
    // Create announcement
    const announcement = await Announcement.create({ subject, msg });

    // Get all student emails
    const students = await Student.findAll({ attributes: ['email'] });
    const emailList = students.map(student => student.email);

    // Prepare attachment for Nodemailer
    const attachments = req.files.map(file => ({
      filename: file.originalname,
      path: file.path
    }))


    // Send email
    await sendEmail(emailList, subject, msg, attachments);

    return res.json({ announcement, emailStatus: "Emails sent" });
  } catch (err) {
    console.error("Error in POST /api/announcement:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

// Load announcements
router.get(`/`, async (req, res) => {
  const announcements = await Announcement.findAll();
  // console.log('announcement from db: ', announcements)
  return res.status(200).json(announcements);
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