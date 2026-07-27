const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const Address = require('../models/addressModel');

// @desc    Get user addresses
// @route   GET /api/v1/addresses
// @access  Private
const getAddresses = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const addresses = await Address.find({ user: userId }).sort({ isDefault: -1, createdAt: -1 });
  return ApiResponse.success(res, 'Addresses fetched successfully', addresses, 200);
});

// @desc    Add new address
// @route   POST /api/v1/addresses
// @access  Private
const addAddress = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const { fullName, phone, house, street, area, city, state, pincode, country = 'India', isDefault } = req.body;

  if (isDefault) {
    await Address.updateMany({ user: userId }, { isDefault: false });
  }

  // If first address, make it default automatically
  const existingCount = await Address.countDocuments({ user: userId });
  const shouldBeDefault = isDefault || existingCount === 0;

  const address = await Address.create({
    user: userId,
    fullName,
    phone,
    house,
    street,
    area,
    city,
    state,
    pincode,
    country,
    isDefault: shouldBeDefault,
  });

  return ApiResponse.success(res, 'Address created successfully', address, 201);
});

// @desc    Update address
// @route   PUT /api/v1/addresses/:id
// @access  Private
const updateAddress = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const { id } = req.params;

  let address = await Address.findOne({ _id: id, user: userId });
  if (!address) {
    return ApiResponse.error(res, 'Address not found', 404);
  }

  if (req.body.isDefault) {
    await Address.updateMany({ user: userId }, { isDefault: false });
  }

  Object.assign(address, req.body);
  await address.save();

  return ApiResponse.success(res, 'Address updated successfully', address, 200);
});

// @desc    Delete address
// @route   DELETE /api/v1/addresses/:id
// @access  Private
const deleteAddress = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const { id } = req.params;

  const address = await Address.findOneAndDelete({ _id: id, user: userId });
  if (!address) {
    return ApiResponse.error(res, 'Address not found', 404);
  }

  return ApiResponse.success(res, 'Address deleted successfully', { id }, 200);
});

// @desc    Set default address
// @route   PUT /api/v1/addresses/:id/default
// @access  Private
const setDefaultAddress = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const { id } = req.params;

  await Address.updateMany({ user: userId }, { isDefault: false });
  const address = await Address.findOneAndUpdate(
    { _id: id, user: userId },
    { isDefault: true },
    { new: true }
  );

  if (!address) {
    return ApiResponse.error(res, 'Address not found', 404);
  }

  return ApiResponse.success(res, 'Default address updated successfully', address, 200);
});

module.exports = {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};
