const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// Helper to recalculate cart pricing
const recalculateCart = async (cart) => {
  let subtotal = 0;
  for (const item of cart.items) {
    if (item.product) {
      subtotal += item.product.price * item.quantity;
      item.priceSnapshot = item.product.price;
    }
  }

  const deliveryFee = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const platformFee = subtotal > 0 ? 7 : 0;
  let couponDiscount = cart.appliedCoupon?.discountAmount || 0;
  if (couponDiscount > subtotal) couponDiscount = subtotal;

  const gst = Math.round((subtotal * 18) / 118); // 18% inclusive GST
  const finalAmount = Math.max(0, subtotal - couponDiscount + deliveryFee + platformFee);

  cart.subtotal = subtotal;
  cart.discount = couponDiscount;
  cart.gst = gst;
  cart.deliveryFee = deliveryFee;
  cart.platformFee = platformFee;
  cart.finalAmount = finalAmount;

  await cart.save();
  return cart;
};

// @desc    Get user cart
// @route   GET /api/v1/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  } else {
    cart = await recalculateCart(cart);
  }
  return ApiResponse.success(res, 'Cart fetched successfully', cart, 200);
});

// @desc    Add item to cart with inventory stock validation
// @route   POST /api/v1/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const { productId, quantity = 1 } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return ApiResponse.error(res, 'Product not found', 404);
  }

  if (product.stock === 0 || product.status === 'out_of_stock') {
    return ApiResponse.error(res, `Sorry! '${product.name}' is currently out of stock.`, 400);
  }

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  const existingIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  const currentQty = existingIndex > -1 ? cart.items[existingIndex].quantity : 0;
  const requestedQty = currentQty + Number(quantity);

  if (requestedQty > product.stock) {
    return ApiResponse.error(
      res,
      `Cannot add ${quantity} more. Only ${product.stock} items available in stock.`,
      400
    );
  }

  if (existingIndex > -1) {
    cart.items[existingIndex].quantity = requestedQty;
  } else {
    cart.items.push({ product: productId, quantity: Number(quantity), priceSnapshot: product.price });
  }

  await cart.save();
  cart = await Cart.findOne({ user: userId }).populate('items.product');
  cart = await recalculateCart(cart);

  return ApiResponse.success(res, 'Item added to cart successfully', cart, 200);
});

// @desc    Update quantity of item in cart
// @route   PUT /api/v1/cart/:productId
// @access  Private
const updateCartQuantity = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const { productId } = req.params;
  const { quantity } = req.body;

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return ApiResponse.error(res, 'Cart not found', 404);
  }

  if (Number(quantity) <= 0) {
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
  } else {
    const product = await Product.findById(productId);
    if (product && Number(quantity) > product.stock) {
      return ApiResponse.error(
        res,
        `Cannot set quantity to ${quantity}. Only ${product.stock} items available in stock.`,
        400
      );
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = Number(quantity);
    }
  }

  await cart.save();
  cart = await Cart.findOne({ user: userId }).populate('items.product');
  cart = await recalculateCart(cart);

  return ApiResponse.success(res, 'Cart quantity updated', cart, 200);
});

// @desc    Remove product from cart
// @route   DELETE /api/v1/cart/:productId
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const { productId } = req.params;

  let cart = await Cart.findOne({ user: userId });
  if (cart) {
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await cart.save();
    cart = await Cart.findOne({ user: userId }).populate('items.product');
    cart = await recalculateCart(cart);
  }

  return ApiResponse.success(res, 'Item removed from cart', cart, 200);
});

// @desc    Clear entire cart
// @route   DELETE /api/v1/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  let cart = await Cart.findOne({ user: userId });
  if (cart) {
    cart.items = [];
    cart.appliedCoupon = undefined;
    await cart.save();
    cart = await recalculateCart(cart);
  }
  return ApiResponse.success(res, 'Cart cleared', cart, 200);
});

module.exports = {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
};
