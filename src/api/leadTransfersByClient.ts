import api from './index';

export interface LeadTransfer {
  id: number;
  lead: any;
  clientId: number;
  status: string;
  notes: string;
  transferredAt: string;
  processedAt: string | null;
}

export interface LeadTransferListResponse {
  content: LeadTransfer[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export async function getLeadTransfersByClient(clientId: number, page = 0, size = 20): Promise<LeadTransferListResponse> {
  const response = await api.get(`/api/v1/lead-transfers/by-client/${clientId}?page=${page}&size=${size}`);
  return response.data;
}
