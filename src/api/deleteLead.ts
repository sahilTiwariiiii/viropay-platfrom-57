import api from './index';

export async function deleteLead(leadId: number) {
  return api.delete(`/api/v1/leads/${leadId}`);
}
