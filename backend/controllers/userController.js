const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const User = require('../models/userModel');
const ApiError = require('../utils/apiError');

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    throw ApiError.notFound('User not found');
  }

  user.name = req.body.name || user.name;
  if (req.body.avatar) user.avatar = req.body.avatar;
  if (req.body.address) user.address = { ...user.address, ...req.body.address };

  const updatedUser = await user.save();

  return ApiResponse.success(res, 'User profile updated successfully', {
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
    avatar: updatedUser.avatar,
    address: updatedUser.address,
  }, 200);
});

module.exports = { updateUserProfile };
