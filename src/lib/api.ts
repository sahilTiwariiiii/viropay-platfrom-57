
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL||'http://13.232.4.177:8888'; 


const AUTH_TOKEN = localStorage.getItem('token');

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

export interface ClientsResponse {
  content: Client[];
  totalElements: number;
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
}

export interface CreateClientData {
  name: string;
  email: string;
  company: string;
  phone: string;
  address: string;
  description: string;
  active: boolean;
}

// Helper function to make authenticated API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${AUTH_TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Get clients with pagination and search
export const getClients = async (page: number = 0, search: string = '', size: number = 20): Promise<ClientsResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    search: search.trim(),
  });

  return apiCall(`/api/v1/clients?${params}`);
};

// Get client by ID
export const getClientById = async (id: number): Promise<Client> => {
  return apiCall(`/api/v1/clients/${id}`);
};

// Create new client
export const createClient = async (data: CreateClientData): Promise<Client> => {
  return apiCall('/api/v1/clients', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// Update existing client
export const updateClient = async (id: number, data: CreateClientData): Promise<Client> => {
  return apiCall(`/api/v1/clients/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

// Delete client
export const deleteClient = async (id: number): Promise<void> => {
  return apiCall(`/api/v1/clients/${id}`, {
    method: 'DELETE',
  });
};

// Mock data for development/testing
export const mockClientsResponse: ClientsResponse = {
  content: [
    {
      id: 1,
      name: "Shan_client",
      email: "shanclient123@gmail.com",
      company: "Orbital Comp",
      phone: "+1-555-1234567",
      address: "Street 1",
      description: "Automobile Client",
      active: true
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@techcorp.com",
      company: "TechCorp Solutions",
      phone: "+1-555-2345678",
      address: "Main St 456",
      description: "Software Development",
      active: true
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@buildco.com",
      company: "BuildCo Industries",
      phone: "+1-555-3456789",
      address: "Industrial Ave 789",
      description: "Construction Services",
      active: false
    }
  ],
  totalElements: 3,
  pageable: {
    pageNumber: 0,
    pageSize: 20
  }
};

// Development mode - use mock data instead of real API
export const USE_MOCK_DATA = false;

// Mock versions of API functions for development
export const getMockClients = async (page: number = 0, search: string = ''): Promise<ClientsResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let filteredContent = mockClientsResponse.content;
  
  if (search.trim()) {
    filteredContent = mockClientsResponse.content.filter(client =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase()) ||
      client.company.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  return {
    content: filteredContent,
    totalElements: filteredContent.length,
    pageable: {
      pageNumber: page,
      pageSize: 20
    }
  };
};

export const getMockClientById = async (id: number): Promise<Client> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const client = mockClientsResponse.content.find(c => c.id === id);
  if (!client) throw new Error('Client not found');
  return client;
};

export const createMockClient = async (data: CreateClientData): Promise<Client> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newClient: Client = {
    id: Date.now(),
    ...data
  };
  mockClientsResponse.content.push(newClient);
  mockClientsResponse.totalElements++;
  return newClient;
};

export const updateMockClient = async (id: number, data: CreateClientData): Promise<Client> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const index = mockClientsResponse.content.findIndex(c => c.id === id);
  if (index === -1) throw new Error('Client not found');
  
  const updatedClient: Client = {
    id,
    ...data
  };
  mockClientsResponse.content[index] = updatedClient;
  return updatedClient;
};

export const deleteMockClient = async (id: number): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const index = mockClientsResponse.content.findIndex(c => c.id === id);
  if (index === -1) throw new Error('Client not found');
  
  mockClientsResponse.content.splice(index, 1);
  mockClientsResponse.totalElements--;
};