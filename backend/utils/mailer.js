const nodemailer = require('nodemailer');

// Use your actual email and app password here (don't hardcode in production)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,         // e.g. 'yourname@gmail.com'
    pass: process.env.EMAIL_PASS          // e.g. Gmail App Password
  }
});

/**
 * Send email to one or more recipients.
 * @param {string[]} recipients - Array of email addresses
 * @param {string} subject - Email subject
 * @param {string} message - Email content
 */
const sendEmail = async (recipients, subject, message) => {
    // console.log('Using pass:', process.env.EMAIL_PASS);
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipients, // array of emails
      subject: subject,
      text: message
    });
    console.log("Emails sent successfully.");
  } catch (err) {
    console.error("Error sending emails:", err);
  }
};

module.exports = { sendEmail };
