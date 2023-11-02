// Import the 'nodemailer' library for sending emails and load environment variables
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Specify the email service provider (e.g., Gmail)
    auth: {
        user: `${process.env.EMAIL}`, // Sender's email address
        clientId: `${process.env.CLIENT_ID}`, // Client ID for authentication
        clientSecret: `${process.env.CLIENT_SECRET}`, // Client Secret for authentication
        pass: `${process.env.PASS}` // Sender's email password
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
