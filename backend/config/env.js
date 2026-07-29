const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const config = {
  // Environment
  env: process.env.NODE_ENV || 'development',

  // Server
  port: parseInt(process.env.PORT || '5000', 10),

  // Database
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/novacart',

  // Frontend URL
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',

  // JWT
  jwtSecret: process.env.JWT_SECRET || 'novacart_jwt_secret_super_secure_key_2026',
  jwtExpire: process.env.JWT_EXPIRE || '30d',

  // Cookies
  cookieExpire: parseInt(process.env.COOKIE_EXPIRE || '30', 10),

  // Rate Limiter
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  },

  // SMTP / Email
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || 'NovaCart Support <no-reply@novacart.com>',
  },

  // Cloudinary
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },
};

module.exports = config;