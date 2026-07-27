const express = require('express');
const router = express.Router();
const {
  getDashboardAnalytics,
  getAllProductsAdmin,
  createProductAdmin,
  updateProductAdmin,
  deleteProductAdmin,
  getAllCategoriesAdmin,
  createCategoryAdmin,
  updateCategoryAdmin,
  deleteCategoryAdmin,
  getInventoryAdmin,
  updateInventoryStockAdmin,
  getAllOrdersAdmin,
  updateOrderStatusAdmin,
  getAllUsersAdmin,
  updateUserRoleAdmin,
  toggleUserBlockAdmin,
  getAllReviewsAdmin,
  deleteReviewAdmin,
} = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');
const { adminOnly } = require('../middlewares/adminMiddleware');

// Protect all admin routes with JWT verification & Admin Role authorization
router.use(protect, adminOnly);

// 1. Dashboard
router.get('/dashboard', getDashboardAnalytics);

// 2. Products
router.route('/products')
  .get(getAllProductsAdmin)
  .post(createProductAdmin);
router.route('/products/:id')
  .put(updateProductAdmin)
  .delete(deleteProductAdmin);

// 3. Categories
router.route('/categories')
  .get(getAllCategoriesAdmin)
  .post(createCategoryAdmin);
router.route('/categories/:id')
  .put(updateCategoryAdmin)
  .delete(deleteCategoryAdmin);

// 4. Inventory
router.get('/inventory', getInventoryAdmin);
router.put('/inventory/:id', updateInventoryStockAdmin);

// 5. Orders
router.get('/orders', getAllOrdersAdmin);
router.put('/orders/:id/status', updateOrderStatusAdmin);

// 6. Users
router.get('/users', getAllUsersAdmin);
router.put('/users/:id/role', updateUserRoleAdmin);
router.put('/users/:id/status', toggleUserBlockAdmin);

// 7. Reviews
router.get('/reviews', getAllReviewsAdmin);
router.delete('/reviews/:productId/:reviewId', deleteReviewAdmin);

module.exports = router;
