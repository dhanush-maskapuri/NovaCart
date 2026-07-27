const Notification = require('../models/notificationModel');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');

// @desc    Get user notifications
// @route   GET /api/v1/notifications
// @access  Private
const getNotifications = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 }).limit(20);
  const unreadCount = await Notification.countDocuments({ user: userId, isRead: false });

  return ApiResponse.success(res, 'Notifications fetched successfully', {
    notifications,
    unreadCount,
  });
});

// @desc    Mark single notification as read
// @route   PUT /api/v1/notifications/:id/read
// @access  Private
const markAsRead = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: userId },
    { isRead: true },
    { new: true }
  );

  return ApiResponse.success(res, 'Notification marked as read', notification);
});

// @desc    Mark all notifications as read
// @route   PUT /api/v1/notifications/read-all
// @access  Private
const markAllAsRead = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  await Notification.updateMany({ user: userId }, { isRead: true });

  return ApiResponse.success(res, 'All notifications marked as read', null);
});

// @desc    Clear all user notifications
// @route   DELETE /api/v1/notifications
// @access  Private
const clearNotifications = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  await Notification.deleteMany({ user: userId });

  return ApiResponse.success(res, 'Notifications cleared', null);
});

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  clearNotifications,
};
