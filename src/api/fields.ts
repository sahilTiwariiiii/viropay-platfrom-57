import api from './index';

// Fetch fields by subcategoryId
export const getFieldsBySubcategory = async (subcategoryId: string) => {
  const response = await api.get(`/api/v1/fields/by-subcategory/${subcategoryId}`);
  return response.data;
};

// Add a new field
export const addField = async (fieldData: any) => {
  const response = await api.post('/api/v1/fields', fieldData);
  return response.data;
};

// Delete a field
export const deleteField = async (fieldId: string) => {
  const response = await api.delete(`/api/v1/fields/${fieldId}`);
  return response.data;
};

// Update a field (if needed)
export const updateField = async (fieldId: string, fieldData: any) => {
  const response = await api.put(`/api/v1/fields/${fieldId}`, fieldData);
  return response.data;
};
