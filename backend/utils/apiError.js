const HTTP_STATUS = require('../constants/httpStatusCodes');

/**
 * Custom Operational Error Class for NovaCart API
 * Extends built-in Error class to support HTTP status codes, operational flags, and error details.
 */
class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code (e.g., 400, 404, 500)
   * @param {string} message - Error explanation message
   * @param {Array|null} errors - Array of specific validation or operational error items
   * @param {string} stack - Optional error stack trace
   */
  constructor(
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message = 'Something went wrong',
    errors = null,
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.data = null;
    this.errors = Array.isArray(errors) ? errors : errors ? [errors] : null;
    this.isOperational = true;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static badRequest(message = 'Bad Request', errors = null) {
    return new ApiError(HTTP_STATUS.BAD_REQUEST, message, errors);
  }

  static unauthorized(message = 'Unauthorized Access', errors = null) {
    return new ApiError(HTTP_STATUS.UNAUTHORIZED, message, errors);
  }

  static forbidden(message = 'Forbidden Access', errors = null) {
    return new ApiError(HTTP_STATUS.FORBIDDEN, message, errors);
  }

  static notFound(message = 'Resource Not Found', errors = null) {
    return new ApiError(HTTP_STATUS.NOT_FOUND, message, errors);
  }

  static internal(message = 'Internal Server Error', errors = null) {
    return new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, message, errors);
  }
}

module.exports = ApiError;
