import React, { createContext, useState, useContext } from 'react';
import { User } from '../types';

type AuthContextType = {
  user: User | null;
  authenticate: (userData: User) => void;
  logOut: () => void;
}

const defaultAuthContext = {
  user: null,
  authenticate: () => {},
  logOut: () => {},
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const userData = localStorage.getItem('user');
  const [user, setUser] = useState<User | null>(null);

  if (userData && !user) {
    setUser(JSON.parse(userData));
  }

  const authenticate = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, authenticate, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};