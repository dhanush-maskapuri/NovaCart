const express = require('express');
const router = express.Router();
const { getCart, addToCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(protect, getCart).post(protect, addToCart);

module.exports = router;
