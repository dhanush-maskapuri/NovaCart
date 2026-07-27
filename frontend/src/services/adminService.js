import api from './api';

// Dashboard Analytics
export const fetchAdminDashboard = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};

// Product Management
export const fetchAdminProducts = async () => {
  const response = await api.get('/admin/products');
  return response.data;
};

export const createAdminProduct = async (productData) => {
  const response = await api.post('/admin/products', productData);
  return response.data;
};

export const updateAdminProduct = async (id, productData) => {
  const response = await api.put(`/admin/products/${id}`, productData);
  return response.data;
};

export const deleteAdminProduct = async (id) => {
  const response = await api.delete(`/admin/products/${id}`);
  return response.data;
};

// Category Management
export const fetchAdminCategories = async () => {
  const response = await api.get('/admin/categories');
  return response.data;
};

export const createAdminCategory = async (categoryData) => {
  const response = await api.post('/admin/categories', categoryData);
  return response.data;
};

export const updateAdminCategory = async (id, categoryData) => {
  const response = await api.put(`/admin/categories/${id}`, categoryData);
  return response.data;
};

export const deleteAdminCategory = async (id) => {
  const response = await api.delete(`/admin/categories/${id}`);
  return response.data;
};

// Inventory Management
export const fetchAdminInventory = async () => {
  const response = await api.get('/admin/inventory');
  return response.data;
};

export const updateAdminInventoryStock = async (id, stock) => {
  const response = await api.put(`/admin/inventory/${id}`, { stock });
  return response.data;
};

// Order Management
export const fetchAdminOrders = async () => {
  const response = await api.get('/admin/orders');
  return response.data;
};

export const updateAdminOrderStatus = async (id, status) => {
  const response = await api.put(`/admin/orders/${id}/status`, { status });
  return response.data;
};

// User Management
export const fetchAdminUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const updateAdminUserRole = async (id, role) => {
  const response = await api.put(`/admin/users/${id}/role`, { role });
  return response.data;
};

export const toggleAdminUserBlock = async (id) => {
  const response = await api.put(`/admin/users/${id}/status`);
  return response.data;
};

// Review Moderation
export const fetchAdminReviews = async () => {
  const response = await api.get('/admin/reviews');
  return response.data;
};

export const deleteAdminReview = async (productId, reviewId) => {
  const response = await api.delete(`/admin/reviews/${productId}/${reviewId}`);
  return response.data;
};
