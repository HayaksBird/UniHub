const winston = require('winston');
const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf } = format;

const logFormat = printf(({ timestamp, level, message, label, meta }) => {
  return `${timestamp} ${label ? `[${label}]` : ''} [${level}] ${message} ${meta ? JSON.stringify(meta) : ''}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'UniHub' }),
    timestamp(),
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
