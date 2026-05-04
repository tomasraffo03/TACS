import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthUser {
  id: string;
  username: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loginWithToken: (token: string) => void;
  logout: () => void;
  updateUser: (data: Partial<Pick<User, 'username' | 'email' | 'avatar'>>) => void;
}

function decodeToken(token: string): { sub: string; roles: string[] } {
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const { sub, roles } = decodeToken(token);
      const role = roles.some(r => r.includes('ADMIN')) ? 'admin' : 'user';
      return { username: sub, email: '', role };
    } catch {
      return null;
    }
  });

  const loginWithToken = (token: string) => {
    localStorage.setItem('token', token);
    const { sub, roles } = decodeToken(token);
    const role = roles.some(r => r.includes('ADMIN')) ? 'admin' : 'user';
    setUser({ username: sub, email: '', role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUser = (data: Partial<Pick<User, 'username' | 'email' | 'avatar'>>) => {
    setUser(prev => (prev ? { ...prev, ...data } : prev));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, loginWithToken, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
