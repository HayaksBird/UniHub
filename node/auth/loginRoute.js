const express = require('express')
const passport = require('./passport-config')
const router = express.Router();

// This is the login route
router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log("An error occurred:", err)
      return res.status(500).json({ message: 'An error occurred' })
    }

    if (!user) {
      console.log("Authentication failed");
      return res.status(401).json({ message: 'Authentication failed' })
    }

    req.login(user, (loginErr) => {
      if (loginErr) {
        console.log("Error serializing user:", loginErr)
        return res.status(500).json({ message: 'An error occurred during login' })
      }

      return res.status(200).json({ message: 'Authentication successful', user })
    });
  })(req, res, next);
});

module.exports = router