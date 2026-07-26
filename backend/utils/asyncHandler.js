/**
 * Async Error Wrapper (Higher-Order Function)
 * Wraps asynchronous Express route handlers to capture promises rejections
 * and automatically forward errors to the global error handling middleware.
 *
 * @param {Function} fn - Async controller function (req, res, next)
 * @returns {Function} Express middleware function
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = asyncHandler;
