const { addUser, isUserUnique, findUserByUsername, findUserById, getAllUsers, getAllProfessors, sessionStore } = require('./db/database')
const { genSaltAndHash, checkAuthenticated, checkNotAuthenticated } = require('./controllers/controller')
const searchProfessors = require('./controllers/searchController')
const professorRoute = require('./routes/professorRoute')
const reviewRoute = require('./routes/reviewRoute')
const passport = require('./auth/passport-config')
const signupRoute = require('./auth/signupRoute')
const loginRoute = require('./auth/loginRoute')
const rateLimit = require("express-rate-limit");
const courseRoute = require('./routes/courseRoute')
const cookieParser = require('cookie-parser')
const responseTime = require('response-time')
const errorHandler = require('errorhandler')
const session = require('express-session')
const bodyParser = require('body-parser')
const logger = require('./log/logger')
const express = require('express')
const helmet = require('helmet')
const log = require('morgan');
const cors = require('cors')
const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 1000, 
});

require('dotenv').config()

app.set('trust proxy', 1);


// app.use((req, res, next) => {
//   if(req.header["X-Api-Key"] == process.env.API_KEY) next();
//   else res.status(402).send()
// })

app.use(helmet());
app.use(cors());
app.use(limiter);

app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 86400000 1 day
      httpOnly: true,
      secure: true
  },
  store: sessionStore
}));

app.use(passport.initialize())
app.use(passport.session())
app.use(log('dev'));
app.use(bodyParser.json())
app.use(cookieParser())
//app.use(errorHandler);
app.use(cookieParser(process.env.SECRET))
app.use(responseTime());

app.use((req, res, next) => {
  const start = Date.now();
  const logData = {
    method: req.method,
    date: new Date(), 
  };

  res.on('finish', () => {
    const responseTime = res.get('X-Response-Time');
    logData.status = res.statusCode;
    logData.responseTime = `${responseTime}`;
    logData.endpoint = req.originalUrl;
    logData.ipAddress = req.ip;
    logData.body = req.body;
    logger.info('HTTP', logData);
  });

  res.on('close', () => {
    const responseTime = res.get('X-Response-Time');
    logData.responseTime = `${responseTime}`;
    logger.warn('HTTP Connection Closed Prematurely', logData);
  });

  next();
});



app.use((err, req, res, next) => {
  const logData = {
    method: req.method,
    url: req.originalUrl,
  };
  logger.error('Error', { ...logData, error: err.stack });
  res.status(500).send('Something broke!');
});

app.use('/signup', signupRoute)
app.use('/login', loginRoute)
app.use('/professors', professorRoute)
app.use('/reviews', reviewRoute)
app.use('/courses', courseRoute)

app.get('/', (req, res) => {
  console.log(req.headers['X-Forwarded-For'])
  res.send(req.ip)
})

app.get('/auth/google/callback', (req, res, next) => {
  // Use the 'google' strategy for authentication and handle the response
  passport.authenticate('google', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Authentication error' });
    }

    req.login(user, (loginErr) => {
      if (loginErr) {
        return res.status(500).json({ message: 'Error creating session for the new user' });
      }
      if (info && info.isNewUser) {
        console.log("User:", info.user);
        return res.status(201).json({ message: 'User created successfully and session created' });
      } else {
        console.log("User:", info.user);
        return res.status(200).json({ message: 'Authentication successful' });
      }
    });
  })(req, res, next);
});


module.exports = app;


