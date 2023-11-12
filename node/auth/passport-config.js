// Import necessary modules and dependencies
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { addUser, isUserUnique, findUserByUsername, findUserById, findUserByEmail, addOauth2User } = require('../db/database');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configure a LocalStrategy for username and password authentication
passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      const [user] = await findUserByUsername(username);
      
      if (!user) {
        return done(null, false); // User not found
      }

      if (!bcrypt.compare(password, user.password)) {
        return done(null, false); // Password does not match
      }

      return done(null, user); // Authentication successful

    } catch (error) {
      return done(error); // Error during authentication
    }
  }
));

// Configure a GoogleStrategy for OAuth2 authentication
passport.use(new GoogleStrategy({
  clientID: `179883402014-k6htcqa1fd005p8ask1s43akk1v2o2j5.apps.googleusercontent.com`,
  clientSecret: `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`,
  callbackURL: '/login/google/callback',
  passReqToCallback: true,
},
async (req, accessToken, refreshToken, profile, done) => {

  const email = profile.emails[0].value; //Get the email from OAuth2 cclient
  
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
      return done(error); // Error during OAuth2 authentication
    }
  } else {

    return done(null, false, { message: 'Only @ku.edu.tr email addresses are allowed.' });

  }
}));

// Define a function to generate the Google OAuth2 authentication URL
passport.generateAuthURL = function (req) {
  const options = {
    scope: ['profile', 'email'],
    prompt: 'select_account', // Force to select the Google account every time
  };

  return passport.authenticate('google', options)(req, null);
};

// Serialize and deserialize user data for session management
passport.serializeUser((user, done) => {
  console.log("serializing the user", user.id)

  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
      const user = await findUserById(id);
      console.log("deserializing the user...")
      return done(null, user);
  } catch (error) {
      return done(error);
  }
});

// Export the configured passport for use in the application
module.exports = passport;
