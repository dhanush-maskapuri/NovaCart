const ApiError = require('../utils/ApiError');
const HTTP_STATUS = require('../constants/httpStatusCodes');

/**
 * Generic Request Validation Middleware Helper
 * Accepts a validation function or schema and validates req.body, req.query, or req.params.
 *
 * @param {Function} validatorFn - Function returning { error, value } or boolean
 * @returns {Function} Express middleware
 */
const validateRequest = (validatorFn) => {
  return (req, res, next) => {
    if (typeof validatorFn !== 'function') {
      return next();
    }

    const result = validatorFn(req);
    if (result && result.error) {
      const errorMessages = Array.isArray(result.error)
        ? result.error
        : [result.error.message || String(result.error)];
      return next(new ApiError(HTTP_STATUS.BAD_REQUEST, 'Validation error', errorMessages));
    }

    next();
  };
};

module.exports = validateRequest;
