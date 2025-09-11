// API functions for leads

const API_BASE = import.meta.env.VITE_BACKEND_URL|| '';


export async function getLeadsBySubcategory(subcategoryId: string, page: number = 0, size: number = 20, status: string = 'NEW') {
  const url = `${API_BASE}/api/v1/leads?subcategoryId=${subcategoryId}&status=${status}&page=${page}&size=${size}`;
  const token = localStorage.getItem('token');
  const res = await fetch(url, {
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch leads');
  return await res.json();
}


export async function getLeadDetails(leadId: string) {
  const url = `${API_BASE}/api/v1/leads/${leadId}`;
  const token = localStorage.getItem('token');
  const res = await fetch(url, {
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch lead details');
  return await res.json();
}
