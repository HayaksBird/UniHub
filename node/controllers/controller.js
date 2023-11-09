// Import the bcrypt library for password hashing
const bcrypt = require('bcrypt');

// Function to generate a salt and hash for a given password
const genSaltAndHash = async (password) => {
  // Generate a salt with a factor of 6
  const salt = await bcrypt.genSalt(6);
  // Generate a hash for the password using the generated salt
  const hash = await bcrypt.hash(password, salt);
  return { salt, hash }; // Return the salt and hash
};

// Function to check if the user is authenticated, and if so, return the user data
const checkAuthenticated = (req, res, next) => {
  console.log(req.headers.cookie)
  if (req.isAuthenticated()) {
    res.status(200).json({ status: "User is authenticated", username: req.user.username, email: req.user.email }); // If authenticated, send user information
  } else {
    res.status(401).json({ status: "User is not authenticated" }); // If not authenticated, send a forbidden status
  }
};

// Function to generate a random string for email confirmation
const generateRandomString = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString; // Return the generated random string
}

// Export the functions for use in the application
module.exports = { genSaltAndHash, checkAuthenticated, generateRandomString };
