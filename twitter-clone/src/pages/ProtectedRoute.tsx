import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../components/AuthContext";

const ProtectedRoute: React.FC = ({ children }) => {
  const { user } = useAuthContext();

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
