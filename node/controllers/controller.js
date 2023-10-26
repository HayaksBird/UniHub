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
    res.status(200).json({ message: "User is authenticated" });
  } else {
    res.status(403).json({ message: "User is not authenticated" });
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