const rateLimit = require('express-rate-limit');
const config = require('../config/env');
const HTTP_STATUS = require('../constants/httpStatusCodes');

/**
 * Express Rate Limiter Middleware
 * Restricts excessive API requests in production to prevent DDoS attacks.
 */
const apiRateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.env === 'production' ? config.rateLimit.max : 10000,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => config.env !== 'production',
  handler: (req, res) => {
    return res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({
      success: false,
      message: 'Too many requests from this IP. Please try again after 15 minutes.',
      data: null,
      errors: ['Rate limit exceeded'],
    });
  },
});

module.exports = apiRateLimiter;
