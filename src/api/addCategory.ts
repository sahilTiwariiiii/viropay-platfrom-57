import api from './index';
import { Category } from './categories';

export const addCategory = async (data: Omit<Category, 'id'>) => {
  const response = await api.post('/api/v1/categories', data);
  return response.data;
};
