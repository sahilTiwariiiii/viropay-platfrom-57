import api from './index';

export interface ClientUser {
  username: string;
  email: string;
  password: string | null;
  role: string;
  clientId: number;
}

export async function getClientUser(clientId: number): Promise<ClientUser> {
  const res = await api.get(`/api/v1/users/client/${clientId}`);
  return res.data;
}

export async function updateClientUser(clientId: number, data: { username: string; password: string | null }): Promise<void> {
  await api.put(`/api/v1/users/client/${clientId}`, data);
}
