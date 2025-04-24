const winston = require('winston');
const { combine, timestamp, printf, colorize, errors } = winston.format;

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    winston.format.metadata()
  ),
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        printf(({ timestamp, level, message, stack, metadata }) => {
          let log = `[${timestamp}] ${level}: ${message}`;
          if (metadata && Object.keys(metadata).length) {
            log += ` ${JSON.stringify(metadata)}`;
          }
          if (stack) {
            log += `\n${stack}`;
          }
          return log;
        })
      )
    }),
    new winston.transports.File({
      filename: 'logs/app.log',
      format: combine(
        winston.format.json()
      )
    })
  ],
});

module.exports = logger;
