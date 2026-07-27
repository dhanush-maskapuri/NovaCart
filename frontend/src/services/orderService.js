import api from './api';

export const createOrderApi = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const fetchMyOrders = async () => {
  const response = await api.get('/orders/myorders');
  return response.data;
};

export const fetchOrderById = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

export const cancelOrderApi = async (orderId) => {
  const response = await api.put(`/orders/${orderId}/cancel`);
  return response.data;
};

export const returnOrderApi = async (orderId) => {
  const response = await api.put(`/orders/${orderId}/return`);
  return response.data;
};

export const fetchOrderTrackingApi = async (orderId) => {
  const response = await api.get(`/orders/${orderId}/tracking`);
  return response.data;
};

export const reorderItemsApi = async (orderId) => {
  const response = await api.post(`/orders/${orderId}/reorder`);
  return response.data;
};
