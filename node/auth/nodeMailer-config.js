const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.PASS}` 
    }
});

function sendEmail(toEmail, text) {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: toEmail, 
        subject: "Email Confirmation",
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent to', toEmail, ':', info.response);
        }
    });
}

module.exports = { sendEmail }