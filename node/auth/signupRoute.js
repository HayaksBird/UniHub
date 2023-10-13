const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { generateRandomString } = require('../controllers/controller')
const { addUser, isUserUnique, findUserByUsername } = require('../db/database')
const { genSaltAndHash, checkAuthenticated, checkNotAuthenticated } = require('../controllers/controller')
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: `${process.env.EMAIL}`,
        clientId: `${process.env.CLIENT_ID}`,
        clientSecret: `${process.env.CLIENT_SECRET}`,
        pass: `${process.env.PASS}`

    }
});

const sendEmail = (toEmail, text) => {
    const mailOptions = {
        from: `${process.env.EMAIL}`,
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

router.post('/', async (req, res, next) => {
  const { username, email, password } = req.body
  const isUnique = await isUserUnique(username, email)
  if(isUnique){
    const code =  generateRandomString()
    const { salt, hash } = await genSaltAndHash(password)

    //sendEmail(email, code)
  
    await addUser(username, email, hash, salt, code)

    res.status(200).send()
  } else{
    res.status(401).send()
  }
  
})



module.exports = router;



