const bcrypt = require('bcrypt')

const genSaltAndHash = async (password) => {
  const salt = await bcrypt.genSalt(6);
  const hash = await bcrypt.hash(password, salt);
  return { salt, hash };
};

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}


module.exports = { genSaltAndHash, checkAuthenticated, checkNotAuthenticated }