import api from './api';

export const fetchActiveCoupons = async () => {
  const response = await api.get('/coupons/active');
  return response.data;
};

export const applyCouponApi = async (code, cartTotal) => {
  const response = await api.post('/coupons/apply', { code, cartTotal });
  return response.data;
};
