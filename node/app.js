const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')
const signupRoute = require('./auth/signupRoute')
const loginRoute = require('./auth/loginRoute')
const session = require('express-session')
const path = require('path')
const store = session.MemoryStore()
const passport = require('./auth/passport-config')
const app = express()
const cors = require('cors')
const { addUser, isUserUnique, findUserByUsername, findUserById, getAllUsers, getAllProfessors } = require('./db/database')
const { genSaltAndHash, checkAuthenticated, checkNotAuthenticated } = require('./controllers/controller')
const searchProfessors = require('./controllers/searchController')
require('dotenv').config()

// app.use((req, res, next) => {
//   console.log(req.headers)
//   if(req.headers["x-api-key"] == process.env.API_KEY) next();
//   else res.status(403).send()
// })
app.set('view engine', 'ejs');
app.use(cors());
app.options('*', cors());
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
  },
  store
}));

app.use(passport.initialize())
app.use(passport.session())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(errorHandler);
app.use('/signup', signupRoute);
app.use('/login', loginRoute)
app.use(cookieParser(process.env.SECRET));

app.get('/search', async (req, res, next) => {
  try{
    const users = await getAllUsers()
    res.json(users)
  } catch(err){
    res.send(err)
  }
})



module.exports = app;


