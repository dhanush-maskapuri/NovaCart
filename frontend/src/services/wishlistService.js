import api from './api';

export const fetchWishlist = async () => {
  const response = await api.get('/wishlist');
  return response.data;
};

export const addToWishlistApi = async (productId) => {
  const response = await api.post('/wishlist', { productId });
  return response.data;
};

export const removeFromWishlistApi = async (productId) => {
  const response = await api.delete(`/wishlist/${productId}`);
  return response.data;
};

export const moveToCartApi = async (productId) => {
  const response = await api.post('/wishlist/move-to-cart', { productId });
  return response.data;
};

export const clearWishlistApi = async () => {
  const response = await api.delete('/wishlist');
  return response.data;
};
