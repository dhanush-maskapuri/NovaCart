const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'Update user profile endpoint skeleton'));
});

module.exports = { updateUserProfile };
