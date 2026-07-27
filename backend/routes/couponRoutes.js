const express = require('express');
const router = express.Router();
const { getActiveCoupons, applyCoupon } = require('../controllers/couponController');

router.get('/active', getActiveCoupons);
router.post('/apply', applyCoupon);

module.exports = router;
