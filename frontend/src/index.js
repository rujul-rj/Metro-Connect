// frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext'; // <-- 1. IMPORT
import App from './App';
import './index.css'; // <-- Global styles will go here

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider> {/* <-- 2. WRAP YOUR APP */}
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider> {/* <-- 3. (CLOSE WRAPPER) */}
    </BrowserRouter>
  </React.StrictMode>
);