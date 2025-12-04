import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, UserRole } from '@/types';
import { getAuthUser, setAuthUser as setStoredAuthUser, getUsers } from '@/lib/localStorage';

interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  isStudent: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = getAuthUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const users = getUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (!foundUser) {
      return { success: false, error: 'Invalid email or password' };
    }

    const authUser: AuthUser = {
      id: foundUser.id,
      role: foundUser.role,
      email: foundUser.email,
      name: foundUser.name,
    };

    setUser(authUser);
    setStoredAuthUser(authUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setStoredAuthUser(null);
  };

  const value: AuthContextType = {
    user,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
