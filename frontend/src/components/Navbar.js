// frontend/src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css'; // We'll create this CSS file

function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Namma Metro Portal
      </Link>
      <div className="navbar-links">
        {token ? (
          // If logged in
          <>
            <Link to="/profile">Profile</Link> {/* Placeholder for later */}
            <button onClick={logout} className="nav-btn">Logout</button>
          </>
        ) : (
          // If logged out
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="nav-btn-primary">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;