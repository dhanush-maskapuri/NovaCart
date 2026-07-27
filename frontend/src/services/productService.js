import api from './api';

export const fetchProducts = async (params) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const fetchSearchSuggestions = async (keyword) => {
  const response = await api.get('/products/search/suggestions', { params: { keyword } });
  return response.data;
};

export const fetchFeaturedProducts = async (limit = 12) => {
  const response = await api.get('/products/featured', { params: { limit } });
  return response.data;
};

export const fetchTrendingProducts = async (limit = 12) => {
  const response = await api.get('/products/trending', { params: { limit } });
  return response.data;
};

export const fetchBestSellers = async (limit = 12) => {
  const response = await api.get('/products/bestsellers', { params: { limit } });
  return response.data;
};

export const fetchNewArrivals = async (limit = 12) => {
  const response = await api.get('/products/new-arrivals', { params: { limit } });
  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};
