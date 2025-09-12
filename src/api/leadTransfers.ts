import api from './index';

export interface LeadTransferPayload {
  leadIds: number[];
  clientIds: number[];
  notes?: string;
}

export async function transferLeadsToClients(payload: LeadTransferPayload) {
  const response = await api.post('/api/v1/lead-transfers', payload);
  return response.data;
}
