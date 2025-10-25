// frontend/src/context/AuthContext.js

import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  // Call this function when you log in
  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    navigate('/'); // Redirect to homepage
  };

  // Call this function when you log out
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login'); // Redirect to login page
  };

  const value = {
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// This is a custom hook to easily access the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};