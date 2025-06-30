import apiClient from '../apiClient';

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/api/v1/auth/login', { email, password });
  return response.data;
};