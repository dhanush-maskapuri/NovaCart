const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, 'Create order endpoint skeleton', {}, 201);
});

// @desc    Get logged in user orders
// @route   GET /api/v1/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, 'Get my orders endpoint skeleton', [], 200);
});

module.exports = { createOrder, getMyOrders };
