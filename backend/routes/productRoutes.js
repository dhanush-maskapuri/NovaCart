const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct } = require('../controllers/productController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.route('/').get(getProducts).post(protect, authorize('admin'), createProduct);
router.route('/:id').get(getProductById);

module.exports = router;
