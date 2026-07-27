const User = require('../models/userModel');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const Order = require('../models/orderModel');
const Notification = require('../models/notificationModel');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');

// ==========================================
// 1. DASHBOARD ANALYTICS
// ==========================================
const getDashboardAnalytics = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();
  
  // Aggregate revenue & status counts
  const revenueAgg = await Order.aggregate([
    { $match: { orderStatus: { $ne: 'Cancelled' } } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } },
  ]);
  const totalRevenue = revenueAgg[0]?.total || 0;

  const lowStockProducts = await Product.find({ stock: { $lte: 5 } }).select('name stock price category brand image SKU');
  const lowStockCount = lowStockProducts.length;

  const pendingOrdersCount = await Order.countDocuments({ orderStatus: { $in: ['Placed', 'Confirmed', 'Processing'] } });

  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('user', 'name email');

  const recentUsers = await User.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select('name email role isBlocked createdAt');

  // Category sales breakdown
  const categorySales = await Product.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  return ApiResponse.success(res, 'Dashboard analytics fetched successfully', {
    totalUsers,
    totalProducts,
    totalOrders,
    totalRevenue,
    lowStockCount,
    pendingOrdersCount,
    lowStockProducts,
    recentOrders,
    recentUsers,
    categorySales,
  });
});

// ==========================================
// 2. PRODUCT MANAGEMENT
// ==========================================
const getAllProductsAdmin = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  return ApiResponse.success(res, 'Products fetched', products);
});

const createProductAdmin = asyncHandler(async (req, res) => {
  const { name, brand, category, subcategory, price, originalPrice, stock, description } = req.body;
  if (!name || !price || !category) {
    throw ApiError.badRequest('Product name, category, and price are required.');
  }

  const stockNum = Number(stock || 0);
  const status = stockNum === 0 ? 'out_of_stock' : 'active';

  const product = await Product.create({
    ...req.body,
    brand: brand || 'NovaCart',
    description: description || `${name} - High quality product on NovaCart marketplace.`,
    stock: stockNum,
    status,
    image: req.body.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  });

  return ApiResponse.success(res, 'Product created successfully', product, 201);
});

const updateProductAdmin = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    throw ApiError.notFound('Product not found');
  }

  if (req.body.stock !== undefined) {
    const stockNum = Number(req.body.stock);
    req.body.status = stockNum === 0 ? 'out_of_stock' : 'active';
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  return ApiResponse.success(res, 'Product updated successfully', product);
});

const deleteProductAdmin = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw ApiError.notFound('Product not found');
  }

  await product.deleteOne();
  return ApiResponse.success(res, 'Product deleted successfully', null);
});

// ==========================================
// 3. CATEGORY MANAGEMENT
// ==========================================
const getAllCategoriesAdmin = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  return ApiResponse.success(res, 'Categories fetched', categories);
});

const createCategoryAdmin = asyncHandler(async (req, res) => {
  const { name, slug, icon, subcategories } = req.body;
  if (!name) throw ApiError.badRequest('Category name is required.');

  const formattedSubcats = Array.isArray(subcategories)
    ? subcategories.map((sub) => (typeof sub === 'string' ? { name: sub, slug: sub.toLowerCase().replace(/\s+/g, '-') } : sub))
    : [];

  const category = await Category.create({
    name,
    slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
    icon: icon || 'FiGrid',
    subcategories: formattedSubcats,
  });

  return ApiResponse.success(res, 'Category created', category, 201);
});

const updateCategoryAdmin = asyncHandler(async (req, res) => {
  if (req.body.subcategories && Array.isArray(req.body.subcategories)) {
    req.body.subcategories = req.body.subcategories.map((sub) =>
      typeof sub === 'string' ? { name: sub, slug: sub.toLowerCase().replace(/\s+/g, '-') } : sub
    );
  }
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!category) throw ApiError.notFound('Category not found');
  return ApiResponse.success(res, 'Category updated', category);
});

const deleteCategoryAdmin = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw ApiError.notFound('Category not found');

  // Prevent deletion if category contains products
  const productCount = await Product.countDocuments({ category: new RegExp(category.name, 'i') });
  if (productCount > 0) {
    throw ApiError.badRequest(`Cannot delete category '${category.name}' because it contains ${productCount} active products.`);
  }

  await category.deleteOne();
  return ApiResponse.success(res, 'Category deleted successfully', null);
});

// ==========================================
// 4. INVENTORY MANAGEMENT
// ==========================================
const getInventoryAdmin = asyncHandler(async (req, res) => {
  const inventory = await Product.find()
    .select('name brand category price stock status SKU')
    .sort({ stock: 1 });

  const summary = {
    totalProducts: inventory.length,
    totalStock: inventory.reduce((sum, p) => sum + (p.stock || 0), 0),
    outOfStockCount: inventory.filter((p) => (p.stock || 0) === 0).length,
    lowStockCount: inventory.filter((p) => (p.stock || 0) > 0 && (p.stock || 0) <= 5).length,
  };

  return ApiResponse.success(res, 'Inventory details fetched', { inventory, summary });
});

const updateInventoryStockAdmin = asyncHandler(async (req, res) => {
  const { stock } = req.body;
  if (stock === undefined) throw ApiError.badRequest('Stock value is required.');

  const stockNum = Number(stock);
  const status = stockNum === 0 ? 'out_of_stock' : 'active';

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { stock: stockNum, status },
    { new: true }
  );

  if (!product) throw ApiError.notFound('Product not found');
  return ApiResponse.success(res, 'Stock updated successfully', product);
});

// ==========================================
// 5. ORDER MANAGEMENT
// ==========================================
const getAllOrdersAdmin = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'name email phone')
    .sort({ createdAt: -1 });

  return ApiResponse.success(res, 'All orders fetched', orders);
});

const updateOrderStatusAdmin = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!status) throw ApiError.badRequest('Order status is required.');

  const order = await Order.findById(req.params.id);
  if (!order) throw ApiError.notFound('Order not found');

  order.orderStatus = status;
  order.timeline.push({
    status,
    timestamp: new Date(),
    location: 'NovaCart Dispatch Hub',
    description: `Order status updated to '${status}' by NovaCart Admin.`,
  });

  if (status === 'Delivered') {
    order.deliveredAt = new Date();
  }
  await order.save();

  // Notify user automatically
  await Notification.create({
    user: order.user,
    title: `📦 Order Status Update: ${status}`,
    message: `Your Order #${order._id} status is now '${status}'. Tracking ID: ${order.trackingId}`,
    type: status === 'Delivered' ? 'delivered' : 'order_shipped',
    orderId: order._id,
  });

  return ApiResponse.success(res, `Order status updated to ${status}`, order);
});

// ==========================================
// 6. USER MANAGEMENT
// ==========================================
const getAllUsersAdmin = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });

  const enrichedUsers = await Promise.all(
    users.map(async (u) => {
      const userOrders = await Order.find({ user: u._id, orderStatus: { $ne: 'Cancelled' } });
      const ordersCount = userOrders.length;
      const totalSpending = userOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
      return {
        ...u.toObject(),
        ordersCount,
        totalSpending,
      };
    })
  );

  return ApiResponse.success(res, 'Users fetched', enrichedUsers);
});

const updateUserRoleAdmin = asyncHandler(async (req, res) => {
  const { role } = req.body;
  if (!['user', 'admin'].includes(role)) throw ApiError.badRequest('Role must be user or admin.');

  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
  if (!user) throw ApiError.notFound('User not found');

  return ApiResponse.success(res, `User role changed to ${role}`, user);
});

const toggleUserBlockAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw ApiError.notFound('User not found');

  user.isBlocked = !user.isBlocked;
  await user.save();

  return ApiResponse.success(
    res,
    `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully`,
    { _id: user._id, isBlocked: user.isBlocked }
  );
});

// ==========================================
// 7. REVIEW MODERATION
// ==========================================
const getAllReviewsAdmin = asyncHandler(async (req, res) => {
  const products = await Product.find({ 'reviews.0': { $exists: true } }).select('name reviews');
  const allReviews = [];
  products.forEach((p) => {
    p.reviews.forEach((r) => {
      allReviews.push({
        _id: r._id,
        productName: p.name,
        productId: p._id,
        user: r.name,
        rating: r.rating,
        comment: r.comment,
        createdAt: r.createdAt,
      });
    });
  });

  return ApiResponse.success(res, 'Reviews fetched', allReviews);
});

const deleteReviewAdmin = asyncHandler(async (req, res) => {
  const { productId, reviewId } = req.params;
  const product = await Product.findById(productId);
  if (!product) throw ApiError.notFound('Product not found');

  product.reviews = product.reviews.filter((r) => r._id.toString() !== reviewId);
  product.numReviews = product.reviews.length;
  if (product.numReviews > 0) {
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
  } else {
    product.rating = 0;
  }

  await product.save();
  return ApiResponse.success(res, 'Review deleted successfully', null);
});

module.exports = {
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
};
