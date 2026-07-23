const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');

// @desc    Get all products with filtering, search, pagination
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, [], 'Get products endpoint skeleton'));
});

// @desc    Get single product details
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'Get product by ID endpoint skeleton'));
});

// @desc    Create product (Admin)
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  res.status(201).json(new ApiResponse(201, {}, 'Create product endpoint skeleton'));
});

module.exports = { getProducts, getProductById, createProduct };
