// Import the Winston library
const winston = require('winston');

// Destructure the createLogger, format, and transports objects from the Winston library
const { createLogger, format, transports } = winston;

// Destructure the combine, timestamp, label, printf, and metadata objects from the format object
const { combine, timestamp, label, printf, metadata } = format;

// Define a custom log format
const logFormat = printf(({ level, message, label, metadata }) => {
  // Extract the method, status, responseTime, endpoint, ipAddress, body, and date from the metadata object
  const { method, status, responseTime, endpoint, ipAddress, body, date } = metadata;

  // Return the log message in the desired format
  return `📥 Request Data: ${label ? `[${label}]` : ''} [${level}] ${message}\n   [Method: ${method}, Status: ${status}, Response Time: ${responseTime}, Endpoint: ${endpoint}, IP Address: ${ipAddress}, Request Body: ${body}, Date: ${date}]`;
});

// Create a new Winston logger
const logger = createLogger({
  // Set the log level to 'info'
  level: 'info',

  // Define the log format
  format: combine(
    // Add a label to all log messages
    label({ label: 'UniHub' }),

    // Add a timestamp to all log messages
    timestamp(),

    // Add metadata to all log messages
    metadata(),

    // Use the custom log format
    logFormat
  ),

  // Define the transports to use
  transports: [
    // Create a new file transport
    new transports.File({
      // Define the filename to log to
      filename: 'app.log',

      // Set the log level for the file transport to 'info'
      level: 'info',

      // Define the maximum size of the log file
      maxsize: 10485760,

      // Define the maximum number of log files to keep
      maxFiles: 5,

      // Enable tailing of the log file
      tailable: true,
    }),
  ],
});

// Export the logger so that it can be used by other modules
module.exports = logger;
