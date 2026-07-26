const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, 'User register endpoint skeleton', {}, 200);
});

// @desc    Authenticate user & get token
// @route   POST /api/v1/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, 'User login endpoint skeleton', {}, 200);
});

// @desc    Get current user profile
// @route   GET /api/v1/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, 'User profile endpoint skeleton', {}, 200);
});

module.exports = { registerUser, loginUser, getUserProfile };
