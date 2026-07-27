const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const orderService = require('../services/orderService');

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const order = await orderService.createOrder(userId, req.body);
  return ApiResponse.success(res, 'Order created successfully', order, 201);
});

// @desc    Get logged in user orders
// @route   GET /api/v1/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const orders = await orderService.getUserOrders(userId);
  return ApiResponse.success(res, 'Orders fetched successfully', orders, 200);
});

// @desc    Get order details by ID
// @route   GET /api/v1/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const order = await orderService.getOrderById(req.params.id, userId);
  return ApiResponse.success(res, 'Order details fetched', order, 200);
});

// @desc    Cancel order
// @route   PUT /api/v1/orders/:id/cancel
// @access  Private
const cancelOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const order = await orderService.cancelOrder(req.params.id, userId);
  return ApiResponse.success(res, 'Order cancelled successfully', order, 200);
});

// @desc    Return order
// @route   PUT /api/v1/orders/:id/return
// @access  Private
const returnOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const order = await orderService.returnOrder(req.params.id, userId);
  return ApiResponse.success(res, 'Return request submitted', order, 200);
});

// @desc    Get live order tracking timeline
// @route   GET /api/v1/orders/:id/tracking
// @access  Private
const getOrderTracking = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const tracking = await orderService.getOrderTracking(req.params.id, userId);
  return ApiResponse.success(res, 'Order tracking details fetched', tracking, 200);
});

// @desc    Reorder items from previous order
// @route   POST /api/v1/orders/:id/reorder
// @access  Private
const reorderItems = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const cart = await orderService.reorderItems(req.params.id, userId);
  return ApiResponse.success(res, 'Items added to cart for reorder', cart, 200);
});

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  returnOrder,
  getOrderTracking,
  reorderItems,
};
