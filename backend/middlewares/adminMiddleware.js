const ApiError = require('../utils/apiError');

/**
 * Middleware to restrict route access strictly to Administrator users
 */
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    throw new ApiError(403, 'Access denied. Administrator privileges required.');
  }
  next();
};

module.exports = { adminOnly };
