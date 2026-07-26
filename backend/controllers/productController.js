const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

// @desc    Get all products with filtering, search, pagination
// @route   GET /api/v1/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, 'Get products endpoint skeleton', [], 200);
});

// @desc    Get single product details
// @route   GET /api/v1/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, 'Get product by ID endpoint skeleton', {}, 200);
});

// @desc    Create product (Admin)
// @route   POST /api/v1/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, 'Create product endpoint skeleton', {}, 201);
});

module.exports = { getProducts, getProductById, createProduct };
