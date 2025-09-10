import api from './index';

export const getFieldById = async (fieldId: string) => {
  const response = await api.get(`/api/v1/fields/${fieldId}`);
  return response.data;
};
