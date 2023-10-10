const express = require('express')
const passport = require('./passport-config')
const router = express.Router();

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'An error occurred' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    return res.status(200).json({ message: 'Authentication successful', user });
  })(req, res, next);
});

router.get('/', (req, res, next) => {
  res.render('./index.ejs')
})

module.exports = router