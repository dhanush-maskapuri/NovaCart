const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const HTTP_STATUS = require('../constants/httpStatusCodes');
const config = require('../config/env');
const logger = require('../utils/logger');

/**
 * Global Error Handling Middleware for NovaCart Express App
 * Intercepts all operational and unhandled errors and formats them into the standard:
 * {
 *   success: false,
 *   message: string,
 *   data: null,
 *   errors: array | null
 * }
 */
const errorHandler = (err, req, res, next) => {
  let error = err;

  // Convert non-ApiError instances into ApiError
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, null, err.stack);
  }

  // Handle Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    const message = `Resource not found with invalid id: ${err.value}`;
    error = new ApiError(HTTP_STATUS.NOT_FOUND, message);
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    const message = `Duplicate value entered for ${field}. Please use another value.`;
    error = new ApiError(HTTP_STATUS.CONFLICT, message);
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const errorsList = Object.values(err.errors).map((el) => el.message);
    const message = 'Invalid input validation failure.';
    error = new ApiError(HTTP_STATUS.BAD_REQUEST, message, errorsList);
  }

  // Handle JWT Invalid Token Error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid JSON Web Token. Authentication failed.';
    error = new ApiError(HTTP_STATUS.UNAUTHORIZED, message);
  }

  // Handle JWT Expired Token Error
  if (err.name === 'TokenExpiredError') {
    const message = 'JSON Web Token has expired. Please log in again.';
    error = new ApiError(HTTP_STATUS.UNAUTHORIZED, message);
  }

  // Log non-operational internal errors
  if (!error.isOperational || config.env === 'development') {
    logger.error(`[${req.method}] ${req.originalUrl} - ${error.message}`, error);
  }

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
    data: null,
    errors: error.errors,
    ...(config.env === 'development' && { stack: error.stack }),
  });
};

module.exports = errorHandler;
