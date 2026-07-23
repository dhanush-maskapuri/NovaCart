const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { items: [] }, 'Get cart endpoint skeleton'));
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'Add to cart endpoint skeleton'));
});

module.exports = { getCart, addToCart };
