// frontend/src/context/AuthContext.js
<<<<<<< HEAD
import React, { createContext, useState, useContext, useEffect } from 'react';
=======

import React, { createContext, useState, useContext } from 'react';
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
<<<<<<< HEAD
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch (e) {
      return null;
    }
  });
  
  const navigate = useNavigate();

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData)); // Store full user object
    setToken(userData.token);
    setUser(userData);
    navigate('/'); // Redirect to homepage
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/login'); // Redirect to login page
  };

  // Function to update user data locally (e.g., after adding money)
  const refreshUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem('user', JSON.stringify(newUserData));
  };

  const value = {
    token,
    user, // Provide user object
    login,
    logout,
    refreshUser, // Provide refresh function
=======
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
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

<<<<<<< HEAD
=======
// This is a custom hook to easily access the auth context
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1
export const useAuth = () => {
  return useContext(AuthContext);
};