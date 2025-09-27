'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'employee' | 'manager' | 'admin' | 'guest';
  department: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  users: User[];
  switchUser: (userId: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: User[] = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@techcorp.com",
    role: "admin",
    department: "IT"
  },
  {
    id: 2,
    name: "María González",
    email: "maria.gonzalez@techcorp.com",
    role: "manager",
    department: "Desarrollo"
  },
  {
    id: 3,
    name: "Ana López",
    email: "ana.lopez@techcorp.com",
    role: "employee",
    department: "RRHH"
  },
  {
    id: 4,
    name: "Carlos Ruiz",
    email: "carlos.ruiz@techcorp.com",
    role: "employee",
    department: "Marketing"
  },
  {
    id: 5,
    name: "Elena Vega",
    email: "elena.vega@techcorp.com",
    role: "employee",
    department: "Finanzas"
  },
  {
    id: 6,
    name: "Roberto Silva",
    email: "roberto.silva@techcorp.com",
    role: "manager",
    department: "Ventas"
  },
  {
    id: 7,
    name: "Guest User",
    email: "guest@techcorp.com",
    role: "guest",
    department: "Visitante"
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Iniciar como guest por defecto
    const guestUser = mockUsers.find(u => u.role === 'guest');
    if (guestUser) {
      setUser(guestUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular autenticación
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundUser = mockUsers.find(u => u.email === email);

    if (foundUser) {
      // Cualquier contraseña funciona para demo (vulnerabilidad intencional)
      setUser(foundUser);
      setIsAuthenticated(true);
      return true;
    }

    return false;
  };

  const logout = () => {
    // Volver a guest en lugar de logout completo
    const guestUser = mockUsers.find(u => u.role === 'guest');
    if (guestUser) {
      setUser(guestUser);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const switchUser = (userId: number) => {
    const foundUser = mockUsers.find(u => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated,
      users: mockUsers,
      switchUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}