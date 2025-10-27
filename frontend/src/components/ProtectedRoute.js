// frontend/src/components/ProtectedRoute.js

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { token } = useAuth();

  // If the user has a token, show the component (using <Outlet />).
  // Otherwise, send them back to the /login page.
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;