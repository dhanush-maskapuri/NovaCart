const express = require('express');
const router = express.Router();
const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  clearNotifications,
} = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.route('/')
  .get(getNotifications)
  .delete(clearNotifications);

router.put('/read-all', markAllAsRead);
router.put('/:id/read', markAsRead);

module.exports = router;
