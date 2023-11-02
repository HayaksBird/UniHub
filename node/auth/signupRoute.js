// Import necessary modules and dependencies
const express = require('express');
const router = express.Router();
const validator = require('validator');
const axios = require('axios');
const { generateRandomString } = require('../controllers/controller');
const sendEmail = require('./nodeMailer-config');
const { addUser, isUserUnique } = require('../db/database');
const { genSaltAndHash, checkAuthenticated } = require('../controllers/controller');
require('dotenv').config();

// Define a route to handle POST requests for user registration
router.post('/', async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validate the email address using the 'validator' library
  if (!validator.isEmail(email)) {
    return res.status(400).send('Invalid email address');
  }

  // Normalize the email address for consistency
  const normalizedEmail = validator.normalizeEmail(email);

  // Check if the username and email combination is unique
  const isUnique = await isUserUnique(username, normalizedEmail);

  if (isUnique) {
    // Generate a random email confirmation code
    const code = generateRandomString();

    // Generate a salt and hash for the password
    const { salt, hash } = await genSaltAndHash(password);

    // Prepare email data for confirmation
    const emailData = {
      email: normalizedEmail,
      code: code,
    };

    try {
      // Send a confirmation email to the user (This part is currently commented out)
      // axios.post(`${process.env.SECOND_SERVER}/auth`, emailData);

      // Add the user to the database
      await addUser(username, normalizedEmail, hash, salt, code);

      res.status(200).send();
    } catch (error) {
      console.error('Failed to send email:', error);
      res.status(500).send('Failed to send email');
    }
  } else {
    res.status(401).send('Username or email already exists');
  }
});

// Export the router for use in the application
module.exports = router;
