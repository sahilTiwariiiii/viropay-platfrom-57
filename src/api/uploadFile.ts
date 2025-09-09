import api from './index';

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/api/v1/uploads/file', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  // Assuming the API returns the URL in response.data.url
  return response.data.url;
};
