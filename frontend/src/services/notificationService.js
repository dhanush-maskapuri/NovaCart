import api from './api';

export const fetchNotificationsApi = async () => {
  const response = await api.get('/notifications');
  return response.data;
};

export const markNotificationReadApi = async (id) => {
  const response = await api.put(`/notifications/${id}/read`);
  return response.data;
};

export const markAllNotificationsReadApi = async () => {
  const response = await api.put('/notifications/read-all');
  return response.data;
};

export const clearNotificationsApi = async () => {
  const response = await api.delete('/notifications');
  return response.data;
};
