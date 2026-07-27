import api from './api';

export const fetchAddresses = async () => {
  const response = await api.get('/addresses');
  return response.data;
};

export const addAddressApi = async (addressData) => {
  const response = await api.post('/addresses', addressData);
  return response.data;
};

export const updateAddressApi = async (id, addressData) => {
  const response = await api.put(`/addresses/${id}`, addressData);
  return response.data;
};

export const deleteAddressApi = async (id) => {
  const response = await api.delete(`/addresses/${id}`);
  return response.data;
};

export const setDefaultAddressApi = async (id) => {
  const response = await api.put(`/addresses/${id}/default`);
  return response.data;
};
