<<<<<<< HEAD
// frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext'; // <-- 1. IMPORT
import App from './App';
import './index.css'; // <-- Global styles will go here
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // <-- IMPORT
import { AuthProvider } from './context/AuthContext'; // <-- IMPORT
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <BrowserRouter>
      <ThemeProvider> {/* <-- 2. WRAP YOUR APP */}
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider> {/* <-- 3. (CLOSE WRAPPER) */}
    </BrowserRouter>
  </React.StrictMode>
);
=======
    <BrowserRouter> {/* <-- WRAP 1 */}
      <AuthProvider> {/* <-- WRAP 2 */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1
