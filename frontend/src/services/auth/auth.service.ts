import api from '../api';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

export const authService = {
  login: async (data: LoginRequest): Promise<string> => {
    const res = await api.post<string>('/auth/login', data);
    return res.data;
  },

  register: async (data: RegisterRequest): Promise<void> => {
    await api.post<void>('/auth/register', data);
  },
};
