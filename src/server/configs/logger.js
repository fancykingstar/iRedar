const winston = require('winston');

const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level,
      colorize: true,
      timestamp() {
        return new Date().toISOString();
      },
    }),
  ],
});

module.exports = logger;
