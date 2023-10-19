const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const { addUser, isUserUnique, findUserByUsername, findUserById, findUserByEmail, addOauth2User } = require('../db/database')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      const [user] = await findUserByUsername(username)
      console.log(username)
      console.log(user)
      
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

passport.use(new GoogleStrategy({
  clientID: `179883402014-k6htcqa1fd005p8ask1s43akk1v2o2j5.apps.googleusercontent.com`,
  clientSecret: `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`,
  callbackURL: '/auth/google/callback',
  passReqToCallback: true,
},
async (req, accessToken, refreshToken, profile, done) => {

  const email = profile.emails[0].value;
  
  if (email.endsWith('@ku.edu.tr')) {
    try {
      const [user] = await findUserByEmail(email);

      if (user) {
        // User is already in the database, send a 200 status
        return done(null, user, { isNewUser: false });
      } else {
        // User is new, call a function to add the OAuth2 user to your database and send a 201 status
        const newUser = await addOauth2User(profile.id, email, accessToken, refreshToken);

        return done(null, newUser, { isNewUser: true });
      }
    } catch (error) {
      return done(error);
    }
  } else {

    return done(null, false, { message: 'Only @ku.edu.tr email addresses are allowed.' });

  }
}));


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
