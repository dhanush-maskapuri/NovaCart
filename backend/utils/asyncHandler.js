/**
  * Higher-order wrapper to handle asynchronous route errors without try-catch duplication
  */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
