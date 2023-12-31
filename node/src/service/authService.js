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
  if (req.isAuthenticated()) {
    const [user] = req.user
    console.log(user.username)
    res.status(200).send({
      status: "User is authenticated",
      username: user.username,
      email: user.email
    }); // If authenticated, send user information
  } else {
    res.status(202).send({ status: "User is not authenticated" }); // If not authenticated, send a forbidden status
  }
};

const logout = (req, res) => {
  try{
    req.logout((err) => {
      console.log(err)
    }); // Passport's logout function
    res.status(200).send({ status: "Logged out successfully" });
  } catch(err){
    res.status(500).send({ status: "Error Loggin Out" });
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
module.exports = { genSaltAndHash, checkAuthenticated, generateRandomString, logout };
