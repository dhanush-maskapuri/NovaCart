const app = require('./app');
const config = require('./config/env');
const { connectDB } = require('./database/connectDB');
const logger = require('./utils/logger');
const MESSAGES = require('./constants/messages');
const mongoose = require('mongoose');

let server;

// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down server immediately...', err);
  process.exit(1);
});

/**
 * Start NovaCart HTTP Server & Connect Database
 */
const startServer = async () => {
  try {
    // Establish Database Connection
    await connectDB();

    // Start HTTP Listener
    server = app.listen(config.port, () => {
      logger.info(`🚀 NovaCart API Server running in [${config.env}] mode on port ${config.port}`);
      logger.info(`👉 Health Check Endpoint: http://localhost:${config.port}/api/v1/health`);
    });
  } catch (error) {
    logger.error('Failed to initialize NovaCart Server:', error);
    process.exit(1);
  }
};

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! Shutting down server gracefully...', err);
  if (server) {
    server.close(() => {
      mongoose.connection.close(false, () => {
        process.exit(1);
      });
    });
  } else {
    process.exit(1);
  }
});

// Handle SIGINT & SIGTERM Graceful Shutdown Signals
const gracefulShutdown = (signal) => {
  logger.info(`Received ${signal} signal. ${MESSAGES.SERVER.SHUTDOWN}`);
  if (server) {
    server.close(async () => {
      logger.info('HTTP Server closed.');
      try {
        await mongoose.connection.close(false);
        logger.info('MongoDB Connection closed cleanly.');
        process.exit(0);
      } catch (err) {
        logger.error('Error closing MongoDB connection:', err);
        process.exit(1);
      }
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Execute Server Startup
startServer();
