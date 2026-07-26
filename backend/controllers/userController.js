const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, 'Update user profile endpoint skeleton', {}, 200);
});

module.exports = { updateUserProfile };
