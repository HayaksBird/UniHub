const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const { addUser, isUserUnique, findUserByUsername, findUserById } = require('../db/database')


passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      const [user] = await findUserByUsername(username)
      
      if (!user) {
        return done(null, false);
      }

      if (!bcrypt.compare(password, user.password)) {
        return done(null, false);
      }

      return done(null, user);

    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {

    const rows = await findUserById(id);

    if (rows.length === 0) {
      return done(null, false);
    }

    const user = rows[0];
    return done(null, user);

  } catch (error) {
    return done(error);
  }
});

module.exports = passport;
