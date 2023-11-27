// Import the 'nodemailer' library for sending emails and load environment variables
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'Mail.ru',
    auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.PASS}`
    }
});

// Function to send an email
const sendEmail = async (toEmail, text) => {
    const mailOptions = {
        from: `${process.env.EMAIL}`, // Sender's email address
        to: toEmail, // Recipient's email address
        subject: "Email Confirmation", // Email subject
        text: text // Email body text
    };

    // Send the email using the configured transporter
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error); // Handle and log any error during email sending
        } else {
            console.log('Email sent to', toEmail, ':', info.response); // Log the success message
        }
    });
}

// Export the 'sendEmail' function for use in the application
module.exports = sendEmail;
