const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  updateUserProfile,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const {
  validateRegisterInput,
  validateLoginInput,
  validateForgotPasswordInput,
  validateResetPasswordInput,
  validateProfileUpdateInput,
  validateChangePasswordInput,
} = require('../validators/authValidator');

// Public routes
router.post('/register', validateRequest(validateRegisterInput), registerUser);
router.post('/login', validateRequest(validateLoginInput), loginUser);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', validateRequest(validateForgotPasswordInput), forgotPassword);
router.post('/reset-password', validateRequest(validateResetPasswordInput), resetPassword);

// Protected routes
router.use(protect);
router.post('/logout', logoutUser);
router.get('/me', getMe);
router.get('/profile', getMe);
router.put('/profile', validateRequest(validateProfileUpdateInput), updateUserProfile);
router.put('/change-password', validateRequest(validateChangePasswordInput), changePassword);

module.exports = router;
