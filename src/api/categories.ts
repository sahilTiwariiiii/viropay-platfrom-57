import api from './index';

export interface Category {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  active: boolean;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get('/api/v1/categories');
  return response.data;
};
