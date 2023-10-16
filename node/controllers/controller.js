const bcrypt = require('bcrypt')

const genSaltAndHash = async (password) => {
  const salt = await bcrypt.genSalt(6);
  const hash = await bcrypt.hash(password, salt);
  return { salt, hash };
};

const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(403).send()
  }
  res.status(200).send()
}

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("User Data:", req.user);
    res.status(200).send();
  } else {
    console.log("User Not Authenticated");
    res.status(403).send();
  }
};

const generateRandomString = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  randomString+='-'

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

module.exports = { genSaltAndHash, checkAuthenticated, checkNotAuthenticated, generateRandomString }