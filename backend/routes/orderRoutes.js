const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  returnOrder,
  getOrderTracking,
  reorderItems,
} = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.route('/')
  .post(createOrder);

router.get('/myorders', getMyOrders);
router.get('/:id', getOrderById);
router.put('/:id/cancel', cancelOrder);
router.put('/:id/return', returnOrder);
router.get('/:id/tracking', getOrderTracking);
router.post('/:id/reorder', reorderItems);

module.exports = router;
