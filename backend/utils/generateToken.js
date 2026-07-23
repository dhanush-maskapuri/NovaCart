const jwt = require('jsonwebtoken');

/**
 * Generate JWT Authentication Token
 * @param {string} id User ID
 * @returns {string} Signed JWT Token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

module.exports = generateToken;
