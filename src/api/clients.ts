import api from './index';

export interface Client {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  address: string;
  description: string;
  active: boolean;
}

export interface ClientListResponse {
  content: Client[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export async function getClients(search = '', page = 0, size = 20): Promise<ClientListResponse> {
  const response = await api.get(`/api/v1/clients?search=${encodeURIComponent(search)}&page=${page}&size=${size}`);
  return response.data;
}

export async function getClientDetails(id: number): Promise<Client> {
  const response = await api.get(`/api/v1/clients/${id}`);
  return response.data;
}
