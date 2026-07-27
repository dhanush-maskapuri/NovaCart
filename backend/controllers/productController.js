const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const productService = require('../services/productService');

// @desc    Get all products with multi-attribute filtering, search, pagination
// @route   GET /api/v1/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const data = await productService.getAllProducts(req.query);
  return ApiResponse.success(res, 'Products fetched successfully', data, 200);
});

// @desc    Get instant search suggestions
// @route   GET /api/v1/products/search/suggestions
// @access  Public
const getSearchSuggestions = asyncHandler(async (req, res) => {
  const { keyword, q } = req.query;
  const suggestions = await productService.getSearchSuggestions(keyword || q);
  return ApiResponse.success(res, 'Search suggestions fetched', suggestions, 200);
});

// @desc    Get featured products
// @route   GET /api/v1/products/featured
// @access  Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await productService.getFeaturedProducts(req.query.limit);
  return ApiResponse.success(res, 'Featured products fetched', products, 200);
});

// @desc    Get trending products
// @route   GET /api/v1/products/trending
// @access  Public
const getTrendingProducts = asyncHandler(async (req, res) => {
  const products = await productService.getTrendingProducts(req.query.limit);
  return ApiResponse.success(res, 'Trending products fetched', products, 200);
});

// @desc    Get best sellers
// @route   GET /api/v1/products/bestsellers
// @access  Public
const getBestSellers = asyncHandler(async (req, res) => {
  const products = await productService.getBestSellers(req.query.limit);
  return ApiResponse.success(res, 'Best sellers fetched', products, 200);
});

// @desc    Get new arrivals
// @route   GET /api/v1/products/new-arrivals
// @access  Public
const getNewArrivals = asyncHandler(async (req, res) => {
  const products = await productService.getNewArrivals(req.query.limit);
  return ApiResponse.success(res, 'New arrivals fetched', products, 200);
});

// @desc    Get single product details
// @route   GET /api/v1/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  return ApiResponse.success(res, 'Product details fetched successfully', product, 200);
});

// @desc    Create product (Admin)
// @route   POST /api/v1/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body);
  return ApiResponse.success(res, 'Product created successfully', product, 201);
});

module.exports = {
  getProducts,
  getSearchSuggestions,
  getFeaturedProducts,
  getTrendingProducts,
  getBestSellers,
  getNewArrivals,
  getProductById,
  createProduct,
};
