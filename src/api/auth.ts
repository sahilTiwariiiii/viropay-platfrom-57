import api from './index';

export const login = async (email: string, password: string) => {
  const response = await api.post('/api/v1/auth/login', { email, password });
  return response.data;
};
