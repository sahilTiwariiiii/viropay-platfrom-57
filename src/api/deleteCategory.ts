import api from './index';

export const deleteCategory = async (id: number) => {
  const response = await api.delete(`/api/v1/categories/${id}`);
  return response.data;
};
