import React, { createContext, useState, useContext } from 'react';

export interface User {
  username: string;
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  logIn: (userData: User) => void;
  logOut: () => void;
}

const defaultAuthContext = {
  user: null,
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
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
  const logIn = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, isLoggedIn: user !== null, logIn, logOut }}> {/* add isLoggedIn here */}
      {children}
    </AuthContext.Provider>
  );
};