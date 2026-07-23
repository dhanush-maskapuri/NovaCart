const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'User register endpoint skeleton'));
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'User login endpoint skeleton'));
});

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'User profile endpoint skeleton'));
});

module.exports = { registerUser, loginUser, getUserProfile };
