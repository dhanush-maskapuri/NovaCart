const mongoose = require('mongoose');
const config = require('../config/env');
const logger = require('../utils/logger');
const MESSAGES = require('../constants/messages');

/**
 * Establish MongoDB Connection with Mongoose
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    });

    logger.info(`${MESSAGES.DATABASE.CONNECTED} Host: ${conn.connection.host}`);

    // Auto-seed if database is empty
    try {
      const Product = require('../models/productModel');
      const count = await Product.countDocuments();
      if (count === 0) {
        logger.info('Product database is empty. Auto-seeding 150+ Indian marketplace products...');
        const seedDatabase = require('../seeds/seedProducts');
        await seedDatabase();
      }
    } catch (seedErr) {
      logger.warn('Auto-seed check skipped or failed:', seedErr.message);
    }

    // Connection event listeners
    mongoose.connection.on('error', (err) => {
      logger.error(`${MESSAGES.DATABASE.ERROR}: ${err.message}`, err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn(MESSAGES.DATABASE.DISCONNECTED);
    });

    return conn;
  } catch (error) {
    logger.error(`${MESSAGES.DATABASE.ERROR}: ${error.message}`, error);
    // Exit process with failure in production or re-throw
    if (config.env === 'production') {
      process.exit(1);
    }
  }
};

/**
 * Get MongoDB connection state indicator
 */
const getDBStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  const stateCode = mongoose.connection.readyState;
  return {
    code: stateCode,
    status: states[stateCode] || 'unknown',
    host: mongoose.connection.host || null,
    name: mongoose.connection.name || null,
  };
};

module.exports = {
  connectDB,
  getDBStatus,
};
