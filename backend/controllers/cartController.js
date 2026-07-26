const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

// @desc    Get user cart
// @route   GET /api/v1/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, 'Get cart endpoint skeleton', { items: [] }, 200);
});

// @desc    Add item to cart
// @route   POST /api/v1/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, 'Add to cart endpoint skeleton', {}, 200);
});

module.exports = { getCart, addToCart };
