// Import necessary modules and functions
const { sessionStore } = require('./service/mysqlService')
const { checkAuthenticated, logout } = require('./service/authService')
const professorRoute = require('./routes/2ServerRoute/professorRoute')
const reviewRoute = require('./routes/2ServerRoute/reviewRoute')
const passport = require('./config/passport-config')
const signupRoute = require('./routes/authRoute/signupRoute')
const loginRoute = require('./routes/authRoute/loginRoute')
const rateLimit = require("express-rate-limit");
const courseRoute = require('./routes/2ServerRoute/courseRoute')
const cookieParser = require('cookie-parser')
const responseTime = require('response-time')
const session = require('express-session')
const bodyParser = require('body-parser')
const logger = require('./config/logger-config')
const express = require('express')
const helmet = require('helmet')
const log = require('morgan');
const cors = require('cors')
const app = express()

// Define a rate limiter to limit incoming requests
// const limiter = rateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: 1000, // Maximum 1000 requests in the window
// });

require('dotenv').config()

// Set 'trust proxy' to 1 to trust the first proxy in the request chain
//app.set('trust proxy', 1);

// Use helmet for enhanced security
app.use(helmet());
// Enable CORS for cross-origin requests
app.use(cors({
  origin: 'https://rate-my-professor-alpha-smnv-shokh.vercel.app',
  credentials: true,
}));
// Apply rate limiting to the app
//app.use(limiter);
// Configure session management
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30 * 6 , // 6 months
    sameSite: "none",
    httpOnly: true,
    secure: true,
  },
  store: sessionStore
}));
// Initialize Passport for user authentication
app.use(passport.initialize())
app.use(passport.session())
// Use Morgan for request logging
app.use(log('dev'));
// Parse incoming JSON requests
app.use(bodyParser.json())
// Parse cookies and use them
app.use(cookieParser())
// Log response time for each request
app.use(responseTime());

// Log incoming request details and response time
app.use((req, res, next) => {
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

// Handle errors and log them
app.use((err, req, res, next) => {
  const logData = {
    method: req.method,
    url: req.originalUrl,
  };
  logger.error('Error', { ...logData, error: err.stack });
  res.status(500).send('Something broke!');
});

// Define routes for various parts of the application
app.use('/signup', signupRoute)
app.use('/login', loginRoute)
app.use('/professors', professorRoute)
app.use('/reviews', reviewRoute)
app.use('/courses', courseRoute)

// Define an authentication route
app.post('/auth', checkAuthenticated)

// Define a logout route
app.use('/logout', logout)


// Export the Express app
module.exports = app;
