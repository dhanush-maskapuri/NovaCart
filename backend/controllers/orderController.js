const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  res.status(201).json(new ApiResponse(201, {}, 'Create order endpoint skeleton'));
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, [], 'Get my orders endpoint skeleton'));
});

module.exports = { createOrder, getMyOrders };
