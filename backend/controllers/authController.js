const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const authService = require('../services/authService');

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  res.cookie('refreshToken', result.refreshToken, COOKIE_OPTIONS);
  return ApiResponse.success(res, 'User registered successfully', result, 201);
});

// @desc    Authenticate user & get tokens
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  res.cookie('refreshToken', result.refreshToken, COOKIE_OPTIONS);
  return ApiResponse.success(res, 'Login successful', result, 200);
});

// @desc    Logout user & clear cookie
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user ? (req.user.id || req.user._id) : null;
  const result = await authService.logoutUser(userId);
  res.clearCookie('refreshToken', COOKIE_OPTIONS);
  return ApiResponse.success(res, 'Logged out successfully', result, 200);
});

// @desc    Get current authenticated user profile
// @route   GET /api/auth/me, GET /api/auth/profile
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const user = await authService.getMe(userId);
  return ApiResponse.success(res, 'Current user profile fetched', user, 200);
});

// @desc    Update user profile details
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const user = await authService.updateProfile(userId, req.body);
  return ApiResponse.success(res, 'Profile updated successfully', user, 200);
});

// @desc    Change user password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const result = await authService.changePassword(userId, req.body);
  return ApiResponse.success(res, result.message, {}, 200);
});

// @desc    Refresh access token using refresh token cookie or body
// @route   POST /api/auth/refresh-token
// @access  Public
const refreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
  const result = await authService.refreshAccessToken(incomingRefreshToken);
  res.cookie('refreshToken', result.refreshToken, COOKIE_OPTIONS);
  return ApiResponse.success(res, 'Access token refreshed successfully', result, 200);
});

// @desc    Request password reset email / token
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const result = await authService.forgotPassword(req.body.email);
  return ApiResponse.success(res, result.message, result, 200);
});

// @desc    Reset password using reset token
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;
  const result = await authService.resetPassword(token, newPassword);
  return ApiResponse.success(res, result.message, {}, 200);
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  getUserProfile: getMe,
  updateUserProfile,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
};
