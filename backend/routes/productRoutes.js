const express = require('express');
const router = express.Router();
const {
  getProducts,
  getSearchSuggestions,
  getFeaturedProducts,
  getTrendingProducts,
  getBestSellers,
  getNewArrivals,
  getProductById,
  createProduct,
} = require('../controllers/productController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Public endpoints
router.get('/', getProducts);
router.get('/search/suggestions', getSearchSuggestions);
router.get('/featured', getFeaturedProducts);
router.get('/trending', getTrendingProducts);
router.get('/bestsellers', getBestSellers);
router.get('/new-arrivals', getNewArrivals);
router.get('/:id', getProductById);

// Admin endpoints
router.post('/', protect, authorize('admin'), createProduct);

module.exports = router;
