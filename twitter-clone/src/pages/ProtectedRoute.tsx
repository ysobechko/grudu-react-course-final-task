import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute: React.FC = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <>{children}</>;
}
return <Navigate to="/login" replace />;
};

export default ProtectedRoute;