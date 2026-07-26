const rateLimit = require('express-rate-limit');
const config = require('../config/env');
const HTTP_STATUS = require('../constants/httpStatusCodes');

/**
 * Express Rate Limiter Middleware
 * Restricts excessive API requests to prevent DDoS attacks and brute-force attempts.
 */
const apiRateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs, // 15 minutes by default
  max: config.rateLimit.max, // Limit each IP to max requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
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
