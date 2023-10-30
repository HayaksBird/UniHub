const winston = require('winston');
const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf, metadata } = format;

const logFormat = printf(({level, message, label, metadata }) => {
  const { method, status, responseTime, endpoint, ipAddress, body, date } = metadata;
  return `📥 Request Data: ${label ? `[${label}]` : ''} [${level}] ${message}\n   [Method: ${method}, Status: ${status}, Response Time: ${responseTime}, Endpoint: ${endpoint}, IP Address: ${ipAddress}, Request Body: ${body}, Date: ${date}]`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'UniHub' }),
    timestamp(),
    metadata(), // Add metadata to the format
    logFormat
  ),
  transports: [
    new transports.File({
      filename: 'app.log',
      level: 'info',
      maxsize: 10485760,
      maxFiles: 5,
      tailable: true,
    }),
  ],
});

module.exports = logger;
