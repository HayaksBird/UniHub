// Import necessary modules and dependencies
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { addUser, isUserUnique, findUserByUsername, findUserById, findUserByEmail, addOauth2User } = require('../service/mysqlService');
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
  clientID: `179883402014-sdk4o1pm984p0sopilpmph9v0f21p9vq.apps.googleusercontent.com`,
  clientSecret: `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`,
  callbackURL: 'https://88ce-82-215-95-97.ngrok-free.app/login/google/callback',
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


// Define a function to generate the Google OAuth2 authentication URL
passport.generateAuthURL = function (req) {
  const options = {
    scope: ['profile', 'email'],
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
