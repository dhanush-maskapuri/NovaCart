const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const Coupon = require('../models/couponModel');

// Seed default active coupons if missing
const defaultCoupons = [
  { code: 'WELCOME10', discountType: 'percentage', discountValue: 10, minOrderValue: 499, maxDiscount: 500, expiryDate: new Date('2027-12-31') },
  { code: 'FESTIVE20', discountType: 'percentage', discountValue: 20, minOrderValue: 999, maxDiscount: 1000, expiryDate: new Date('2027-12-31') },
  { code: 'NOVACART100', discountType: 'fixed', discountValue: 500, minOrderValue: 1999, maxDiscount: 500, expiryDate: new Date('2027-12-31') },
  { code: 'NEWUSER', discountType: 'fixed', discountValue: 200, minOrderValue: 499, maxDiscount: 200, expiryDate: new Date('2027-12-31') },
];

// @desc    Get active available coupons
// @route   GET /api/v1/coupons/active
// @access  Public
const getActiveCoupons = asyncHandler(async (req, res) => {
  let coupons = await Coupon.find({ isActive: true, expiryDate: { $gt: new Date() } });
  if (coupons.length === 0) {
    await Coupon.insertMany(defaultCoupons);
    coupons = await Coupon.find({ isActive: true });
  }
  return ApiResponse.success(res, 'Active coupons fetched successfully', coupons, 200);
});

// @desc    Apply and validate coupon code
// @route   POST /api/v1/coupons/apply
// @access  Private / Public
const applyCoupon = asyncHandler(async (req, res) => {
  const { code, cartTotal = 0 } = req.body;
  if (!code) {
    return ApiResponse.error(res, 'Coupon code is required', 400);
  }

  const cleanCode = code.trim().toUpperCase();
  let coupon = await Coupon.findOne({ code: cleanCode, isActive: true });

  if (!coupon) {
    // Check fallback defaults
    const fallback = defaultCoupons.find((c) => c.code === cleanCode);
    if (fallback) {
      coupon = await Coupon.create(fallback);
    } else {
      return ApiResponse.error(res, `Coupon code '${cleanCode}' is invalid or expired.`, 400);
    }
  }

  if (new Date() > new Date(coupon.expiryDate)) {
    return ApiResponse.error(res, 'This coupon code has expired.', 400);
  }

  if (cartTotal < coupon.minOrderValue) {
    return ApiResponse.error(res, `Minimum cart value of ₹${coupon.minOrderValue} required for '${cleanCode}'.`, 400);
  }

  let calculatedDiscount = 0;
  if (coupon.discountType === 'percentage') {
    calculatedDiscount = Math.round((cartTotal * coupon.discountValue) / 100);
    if (coupon.maxDiscount && calculatedDiscount > coupon.maxDiscount) {
      calculatedDiscount = coupon.maxDiscount;
    }
  } else {
    calculatedDiscount = coupon.discountValue;
  }

  return ApiResponse.success(res, `Coupon '${cleanCode}' applied successfully!`, {
    code: coupon.code,
    discountAmount: calculatedDiscount,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
  }, 200);
});

module.exports = { getActiveCoupons, applyCoupon };
