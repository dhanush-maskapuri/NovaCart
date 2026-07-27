const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const Wishlist = require('../models/wishlistModel');
const Cart = require('../models/cartModel');

// @desc    Get user wishlist
// @route   GET /api/v1/wishlist
// @access  Private
const getWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  let wishlist = await Wishlist.findOne({ user: userId }).populate('products');
  if (!wishlist) {
    wishlist = { products: [] };
  }
  return ApiResponse.success(res, 'Wishlist fetched successfully', wishlist, 200);
});

// @desc    Add item to wishlist
// @route   POST /api/v1/wishlist
// @access  Private
const addToWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const { productId } = req.body;

  let wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: userId, products: [productId] });
  } else {
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }
  }

  wishlist = await Wishlist.findOne({ user: userId }).populate('products');
  return ApiResponse.success(res, 'Item added to wishlist', wishlist, 200);
});

// @desc    Remove item from wishlist
// @route   DELETE /api/v1/wishlist/:productId
// @access  Private
const removeFromWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const { productId } = req.params;

  let wishlist = await Wishlist.findOne({ user: userId });
  if (wishlist) {
    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );
    await wishlist.save();
  }

  wishlist = await Wishlist.findOne({ user: userId }).populate('products');
  return ApiResponse.success(res, 'Item removed from wishlist', wishlist, 200);
});

// @desc    Move item from wishlist to cart
// @route   POST /api/v1/wishlist/move-to-cart
// @access  Private
const moveToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  const { productId } = req.body;

  // 1. Remove from Wishlist
  let wishlist = await Wishlist.findOne({ user: userId });
  if (wishlist) {
    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );
    await wishlist.save();
  }

  // 2. Add to Cart
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [{ product: productId, quantity: 1 }] });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ product: productId, quantity: 1 });
    }
    await cart.save();
  }

  wishlist = await Wishlist.findOne({ user: userId }).populate('products');
  return ApiResponse.success(res, 'Item moved from wishlist to cart', wishlist, 200);
});

// @desc    Clear entire wishlist
// @route   DELETE /api/v1/wishlist
// @access  Private
const clearWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id || req.user._id;
  await Wishlist.findOneAndUpdate({ user: userId }, { products: [] });
  return ApiResponse.success(res, 'Wishlist cleared successfully', { products: [] }, 200);
});

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  moveToCart,
  clearWishlist,
};
