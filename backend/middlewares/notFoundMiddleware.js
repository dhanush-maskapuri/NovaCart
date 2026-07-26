const ApiError = require('../utils/ApiError');
const HTTP_STATUS = require('../constants/httpStatusCodes');

/**
 * 404 Unknown Route Middleware
 * Catches all requests to non-existent API endpoints.
 */
const notFoundHandler = (req, res, next) => {
  const error = new ApiError(
    HTTP_STATUS.NOT_FOUND,
    `Cannot find endpoint [${req.method}] ${req.originalUrl} on NovaCart server.`
  );
  next(error);
};

module.exports = notFoundHandler;
