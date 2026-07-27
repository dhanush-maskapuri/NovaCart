const Category = require('../models/categoryModel');
const ApiError = require('../utils/apiError');

const getAllCategories = async () => {
  return await Category.find({}).sort({ name: 1 });
};

const getCategoryBySlug = async (slug) => {
  const category = await Category.findOne({ slug: slug.toLowerCase() });
  if (!category) {
    throw ApiError.notFound('Category not found');
  }
  return category;
};

module.exports = {
  getAllCategories,
  getCategoryBySlug,
};
