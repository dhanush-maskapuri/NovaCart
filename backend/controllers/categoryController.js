const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const categoryService = require('../services/categoryService');

// @desc    Get all categories with subcategories
// @route   GET /api/v1/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getAllCategories();
  return ApiResponse.success(res, 'Categories fetched successfully', categories, 200);
});

// @desc    Get single category by slug
// @route   GET /api/v1/categories/:slug
// @access  Public
const getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryBySlug(req.params.slug);
  return ApiResponse.success(res, 'Category details fetched', category, 200);
});

module.exports = {
  getCategories,
  getCategoryBySlug,
};
