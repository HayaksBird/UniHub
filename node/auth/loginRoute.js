// Import necessary modules and dependencies
const express = require('express');
const passport = require('./passport-config');
const router = express.Router();

// Define the login route for local authentication
router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log("An error occurred:", err);
      return res.status(500).json({ message: 'An error occurred' });
    }

    if (!user) {
      console.log("Authentication failed");
      return res.status(401).json({ message: 'Authentication failed' });
    }

    req.login(user, (loginErr) => {
      if (loginErr) {
        console.log("Error serializing user:", loginErr);
        return res.status(500).json({ message: 'An error occurred during login' });
      }

      return res.status(200).json({ message: 'Authentication successful', user });
    });
  })(req, res, next);
});

// Define the route for initiating Google OAuth2 authentication
router.get('/oauth2', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Define the route for handling Google OAuth2 callback
router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Authentication error' });
    }

    req.login(user, (loginErr) => {
      if (loginErr) {
        return res.status(500).json({ message: 'Error creating session for the new user' });
      }
      if (info && info.isNewUser) {
        console.log("User:", user);
        return res.status(201).json({ message: 'User created successfully and session created' });
      } else {
        console.log("User:", info.user);
        return res.status(200).json({ message: 'Authentication successful' });
      }
    });
  })(req, res, next);
});

// Export the router for use in the application
module.exports = router;
