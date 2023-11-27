// Import necessary modules and dependencies
const express = require('express');
const router = express.Router();
const validator = require('validator');
const axios = require('axios');
const passport = require('./passport-config')
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

    try {
      sendEmail(normalizedEmail, code);

      // Add the user to the database
      await addUser(username, normalizedEmail, hash, salt, code);

      // Authenticate the user immediately after successful registration
      passport.authenticate('local', (err, user, info) => {
        if (err) {
          console.log("An error occurred:", err);
          return res.status(500).json({ message: 'An error occurred' });
        }
        req.login(user, (loginErr) => {
          if (loginErr) {
            console.log("Error serializing user:", loginErr);
            return res.status(500).json({ message: 'An error occurred during login' });
          }
          console.log(user);
          return res.status(200).json({ message: 'Authentication and registration successful', email: user.email });
        });
      })(req, res, next);
    } catch (error) {
      console.error('Failed to send email or register user:', error);
      res.status(500).send('Failed to send email or register user');
    }
  } else {
    res.status(401).send('Username or email already exists');
  }
});

// Export the router for use in the application
module.exports = router;
