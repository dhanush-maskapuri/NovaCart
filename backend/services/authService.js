const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/env');
const { generateToken, generateRefreshToken } = require('../utils/generateToken');
const ApiError = require('../utils/apiError');
const emailService = require('./emailService');

const sanitizeUser = (user) => {
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.password;
  delete obj.refreshToken;
  delete obj.resetPasswordToken;
  delete obj.resetPasswordExpire;
  return obj;
};

const register = async ({ name, email, password, phone, role = 'user' }) => {
  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throw ApiError.badRequest('User with this email already exists');
  }

  if (phone) {
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      throw ApiError.badRequest('User with this phone number already exists');
    }
  }

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
    phone: phone ? phone.trim() : '',
    role,
  });

  const token = generateToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return {
    user: sanitizeUser(user),
    token,
    refreshToken,
  };
};

const login = async ({ email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail }).select('+password');
  if (!user) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const token = generateToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return {
    user: sanitizeUser(user),
    token,
    refreshToken,
  };
};

const getMe = async (userId) => {
  const user = await User.findById(userId)
    .populate('wishlist')
    .populate('cart.product')
    .populate('recentlyViewed')
    .populate('continueShopping')
    .populate('orderHistory');

  if (!user) {
    throw ApiError.notFound('User not found');
  }
  return sanitizeUser(user);
};

const updateProfile = async (userId, profileData) => {
  const user = await User.findById(userId);
  if (!user) {
    throw ApiError.notFound('User not found');
  }

  const { name, phone, avatar, address } = profileData;

  if (name) user.name = name.trim();
  if (phone !== undefined) {
    if (phone && phone !== user.phone) {
      const existingPhone = await User.findOne({ phone });
      if (existingPhone) {
        throw ApiError.badRequest('Phone number is already associated with another account');
      }
    }
    user.phone = phone;
  }
  if (avatar) user.avatar = avatar;
  if (address) {
    user.address = {
      ...user.address,
      ...address,
    };
  }

  await user.save();
  return sanitizeUser(user);
};

const changePassword = async (userId, { currentPassword, newPassword }) => {
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw ApiError.notFound('User not found');
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw ApiError.badRequest('Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  return { message: 'Password updated successfully' };
};

const refreshAccessToken = async (incomingRefreshToken) => {
  if (!incomingRefreshToken) {
    throw ApiError.unauthorized('Refresh token is required');
  }

  let decoded;
  try {
    decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET || 'fallback_refresh_secret'
    );
  } catch (err) {
    throw ApiError.unauthorized('Invalid or expired refresh token');
  }

  const user = await User.findById(decoded.id).select('+refreshToken');
  if (!user || user.refreshToken !== incomingRefreshToken) {
    throw ApiError.unauthorized('Refresh token is expired or invalid');
  }

  const newAccessToken = generateToken(user._id, user.role);
  const newRefreshToken = generateRefreshToken(user._id);

  user.refreshToken = newRefreshToken;
  await user.save({ validateBeforeSave: false });

  return {
    token: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

const forgotPassword = async (email) => {
  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    return {
      message: 'If an account exists with that email, password reset instructions have been generated.',
      smtpConfigured: emailService.isConfigured(),
    };
  }

  // Generate cryptographically secure reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 mins

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${config.clientUrl}/reset-password/${resetToken}`;

  const mailResult = await emailService.sendPasswordResetEmail({
    to: user.email,
    resetToken,
    resetUrl,
  });

  return {
    message: mailResult.message,
    resetToken: mailResult.resetToken || resetToken,
    resetUrl,
    sent: mailResult.sent,
    smtpConfigured: mailResult.smtpConfigured,
  };
};

const resetPassword = async (resetToken, newPassword) => {
  if (!resetToken) {
    throw ApiError.badRequest('Password reset token is required');
  }

  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw ApiError.badRequest('Invalid or expired password reset token');
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  return { message: 'Password reset successfully. You may now log in.' };
};

const logoutUser = async (userId) => {
  if (userId) {
    await User.findByIdAndUpdate(userId, { refreshToken: null });
  }
  return { message: 'Logged out successfully' };
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  logoutUser,
};