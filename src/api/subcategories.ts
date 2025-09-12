import api from './index';

export interface SubCategory {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  active?: boolean;
  imageUrl?: string;
}

export const getSubCategoriesByCategory = async (
  categoryId: number,
  page = 0,
  size = 20
): Promise<SubCategory[]> => {
  const response = await api.get(`/api/v1/subcategories/by-category/${categoryId}?page=${page}&size=${size}`);
  console.log('API raw response:', response.data);
  return Array.isArray(response.data) ? response.data : [];
};

// Update subcategory
export const updateSubCategory = async (id: number, payload: Partial<SubCategory>) => {
  const response = await api.put(`/api/v1/subcategories/${id}`, payload);
  return response.data;
};

// Delete subcategory
export const deleteSubCategory = async (id: number) => {
  const response = await api.delete(`/api/v1/subcategories/${id}`);
  return response.data;
};
