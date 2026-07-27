import api from './api';

export const fetchCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

export const addToCartApi = async (productId, quantity = 1) => {
  const response = await api.post('/cart', { productId, quantity });
  return response.data;
};

export const updateCartQuantityApi = async (productId, quantity) => {
  const response = await api.put(`/cart/${productId}`, { quantity });
  return response.data;
};

export const removeFromCartApi = async (productId) => {
  const response = await api.delete(`/cart/${productId}`);
  return response.data;
};

export const clearCartApi = async () => {
  const response = await api.delete('/cart');
  return response.data;
};
