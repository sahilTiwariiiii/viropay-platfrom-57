import api from './index';
import { Category } from './categories';

export const updateCategory = async (id: number, data: Partial<Category>) => {
  const response = await api.put(`/api/v1/categories/${id}`, data);
  return response.data;
};
