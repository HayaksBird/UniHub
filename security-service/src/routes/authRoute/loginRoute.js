// Import necessary modules and dependencies
const express = require('express');
const passport = require('../../config/passport-config');
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
      return res.status(200).json({ message: 'Authentication successful', email: user.email });
    });
  })(req, res, next);
});

// Define the route for initiating Google OAuth2 authentication
router.get('/oauth2', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Define the route for handling Google OAuth2 callback
router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    console.log("I am in the callback");
    if (err) {
      return res.status(500).json({ message: 'Authentication error' });
    }
    console.log("error has passed")
    req.login(user, (loginErr) => {
      console.log("thw user in the session", user)
      if (loginErr) {
        console.log("i am here")
        return res.status(500).json({ message: 'Error creating session for the new user' });
      }
        return res.redirect(`https://rate-my-professor-alpha-smnv-shokh.vercel.app/`);
    });
  })(req, res, next);
});




// Export the router for use in the application
module.exports = router;
