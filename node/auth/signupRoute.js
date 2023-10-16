const express = require('express');
const router = express.Router();
const validator = require('validator');
const axios = require('axios');
const { generateRandomString } = require('../controllers/controller');
const sendEmail = require('./nodeMailer-config');
const { addUser, isUserUnique } = require('../db/database');
const { genSaltAndHash, checkAuthenticated, checkNotAuthenticated } = require('../controllers/controller');
require('dotenv').config();

router.post('/', async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!validator.isEmail(email)) {
    res.status(400).send('Invalid email address');
  }

  const normalizedEmail = validator.normalizeEmail(email);

  const isUnique = await isUserUnique(username, normalizedEmail);
  if (isUnique) {
    const code = generateRandomString();
    const { salt, hash } = await genSaltAndHash(password);

    const emailData = {
      receiverEmail: normalizedEmail,
      code: code,
    };

    try {
      await axios.post(`${process.env.SECOND_SERVER}/email`, emailData);
      await addUser(username, normalizedEmail, hash, salt, code);

      res.status(200).send();
    } catch (error) {
      console.error('Failed to send email:', error);
      res.status(500).send('Failed to send email');
    }
  } else {
    res.status(401).send();
  }
});

module.exports = router;
