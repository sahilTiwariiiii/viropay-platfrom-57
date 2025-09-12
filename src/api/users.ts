import api from './index';

export interface UserCredentials {
  username: string;
  email: string;
  password: string;
  role: string;
  clientId: number;
}

export async function updateUserCredentials(data: UserCredentials) {
  return api.post('/api/v1/users', data);
}
