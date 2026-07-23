const express = require('express');
const router = express.Router();
const { updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/profile').put(protect, updateUserProfile);

module.exports = router;
