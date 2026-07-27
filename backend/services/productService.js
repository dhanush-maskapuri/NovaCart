const Product = require('../models/productModel');
const ApiError = require('../utils/apiError');

/**
 * Fetch all products with multi-attribute filtering, search, sorting, and pagination
 */
const getAllProducts = async (query = {}) => {
  const {
    keyword,
    category,
    subcategory,
    brand,
    brands,
    minPrice,
    maxPrice,
    minRating,
    rating,
    inStockOnly,
    expressOnly,
    minDiscount,
    isFeatured,
    isTrending,
    isBestSeller,
    isNewArrival,
    sort,
    page = 1,
    limit = 20,
  } = query;

  const filter = {};

  // Text search across name, description, brand, category, tags
  if (keyword && keyword.trim()) {
    const regex = new RegExp(keyword.trim(), 'i');
    filter.$or = [
      { name: regex },
      { description: regex },
      { brand: regex },
      { category: regex },
      { subcategory: regex },
      { tags: regex },
    ];
  }

  // Category & Subcategory filter
  if (category && category !== 'all') {
    filter.category = new RegExp(`^${category.trim()}$`, 'i');
  }

  if (subcategory && subcategory !== 'all') {
    filter.subcategory = new RegExp(`^${subcategory.trim()}$`, 'i');
  }

  // Brand filter (single or array)
  if (brands) {
    const brandArray = Array.isArray(brands) ? brands : brands.split(',').map((b) => b.trim());
    if (brandArray.length > 0) {
      filter.brand = { $in: brandArray.map((b) => new RegExp(`^${b}$`, 'i')) };
    }
  } else if (brand && brand !== 'all') {
    filter.brand = new RegExp(`^${brand.trim()}$`, 'i');
  }

  // Price Range filter (INR ₹)
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice !== undefined && minPrice !== '') filter.price.$gte = Number(minPrice);
    if (maxPrice !== undefined && maxPrice !== '') filter.price.$lte = Number(maxPrice);
  }

  // Rating Filter
  const targetRating = minRating || rating;
  if (targetRating) {
    filter.rating = { $gte: Number(targetRating) };
  }

  // In Stock Filter
  if (inStockOnly === 'true' || inStockOnly === true) {
    filter.stock = { $gt: 0 };
    filter.status = { $ne: 'out_of_stock' };
  }

  // Delivery Filter
  if (expressOnly === 'true' || expressOnly === true) {
    filter.deliveryTime = new RegExp('10 Mins Express', 'i');
  }

  // Minimum Discount Filter
  if (minDiscount) {
    filter.discount = { $gte: Number(minDiscount) };
  }

  // Flag Filters
  if (isFeatured === 'true' || isFeatured === true) filter.isFeatured = true;
  if (isTrending === 'true' || isTrending === true) filter.isTrending = true;
  if (isBestSeller === 'true' || isBestSeller === true) filter.isBestSeller = true;
  if (isNewArrival === 'true' || isNewArrival === true) filter.isNewArrival = true;

  // Sorting logic
  let sortOptions = { createdAt: -1 };
  if (sort === 'price-asc' || sort === 'price-low') sortOptions = { price: 1 };
  if (sort === 'price-desc' || sort === 'price-high') sortOptions = { price: -1 };
  if (sort === 'rating') sortOptions = { rating: -1 };
  if (sort === 'discount') sortOptions = { discount: -1 };
  if (sort === 'newest') sortOptions = { createdAt: -1, isNewArrival: -1 };
  if (sort === 'featured') sortOptions = { isFeatured: -1, rating: -1 };

  const pageNum = Math.max(Number(page) || 1, 1);
  const limitNum = Math.min(Math.max(Number(limit) || 20, 1), 100);
  const skip = (pageNum - 1) * limitNum;

  const [products, total] = await Promise.all([
    Product.find(filter).sort(sortOptions).skip(skip).limit(limitNum),
    Product.countDocuments(filter),
  ]);

  return {
    products,
    page: pageNum,
    pages: Math.ceil(total / limitNum) || 1,
    total,
  };
};

/**
 * Get instant search suggestions for autocomplete
 */
const getSearchSuggestions = async (keyword = '') => {
  if (!keyword || !keyword.trim()) return [];

  const regex = new RegExp(keyword.trim(), 'i');
  const products = await Product.find({
    $or: [{ name: regex }, { brand: regex }, { category: regex }, { tags: regex }],
  })
    .select('name brand category price image discount rating')
    .limit(8);

  return products;
};

/**
 * Get single product details by ID
 */
const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw ApiError.notFound('Product not found');
  }
  return product;
};

/**
 * Specialized Collection Queries
 */
const getFeaturedProducts = async (limit = 12) => {
  return await Product.find({ isFeatured: true, status: { $ne: 'inactive' } })
    .sort({ rating: -1 })
    .limit(Number(limit));
};

const getTrendingProducts = async (limit = 12) => {
  return await Product.find({ isTrending: true, status: { $ne: 'inactive' } })
    .sort({ reviewsCount: -1 })
    .limit(Number(limit));
};

const getBestSellers = async (limit = 12) => {
  return await Product.find({ isBestSeller: true, status: { $ne: 'inactive' } })
    .sort({ numReviews: -1 })
    .limit(Number(limit));
};

const getNewArrivals = async (limit = 12) => {
  return await Product.find({ isNewArrival: true, status: { $ne: 'inactive' } })
    .sort({ createdAt: -1 })
    .limit(Number(limit));
};

/**
 * Create product (Admin)
 */
const createProduct = async (productData) => {
  const product = await Product.create(productData);
  return product;
};

module.exports = {
  getAllProducts,
  getSearchSuggestions,
  getProductById,
  getFeaturedProducts,
  getTrendingProducts,
  getBestSellers,
  getNewArrivals,
  createProduct,
};