const morgan = require('morgan');
const logger = require('../utils/logger');
const config = require('../config/env');

// Morgan stream integration with custom logger
const stream = {
  write: (message) => logger.info(message.trim()),
};

// Morgan format for dev vs prod
const format = config.env === 'development' ? 'dev' : 'combined';

const requestLogger = morgan(format, { stream });

module.exports = requestLogger;
