import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  email: string;
  role: string;
  avatar?: string; // base64 o URL
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateUser: (data: Partial<Pick<User, 'username' | 'email' | 'avatar'>>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    // Mock auth: cualquier usuario con password "1234" es válido
    if (password === '1234') {
      setUser({ username, email: '', role: username === 'admin' ? 'admin' : 'user' });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const updateUser = (data: Partial<Pick<User, 'username' | 'email' | 'avatar'>>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
