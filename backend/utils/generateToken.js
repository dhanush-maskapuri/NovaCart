const jwt = require('jsonwebtoken');

/**
 * Generate JWT Access & Refresh Tokens
 */
const generateToken = (id, role = 'user') => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET || 'fallback_refresh_secret', {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
module.exports.generateToken = generateToken;
module.exports.generateRefreshToken = generateRefreshToken;
