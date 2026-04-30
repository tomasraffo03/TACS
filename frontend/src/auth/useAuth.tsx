import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthUser {
  id: string;
  username: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>({
    id: 'demo',
    username: 'demo',
    role: 'user',
  });

  const login = (username: string, password: string): boolean => {
    // Mock auth: cualquier usuario con password "1234" es válido.
    // id se usará como userId en las llamadas a la API; reemplazar cuando exista /api/auth/login.
    if (password === '1234') {
      setUser({
        id: username,               // TODO: reemplazar con el id real del servidor
        username,
        role: username === 'admin' ? 'admin' : 'user',
      });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
