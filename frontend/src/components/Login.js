// frontend/src/components/Login.js

import React, { useState } from 'react';
<<<<<<< HEAD
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import { Link, useNavigate } from 'react-router-dom';
import './Form.css'; // Import the styles

function Login() {
  const { login } = useAuth(); // Get the login function from our context
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

=======
import { useAuth } from '../context/AuthContext';
import './Form.css'; // Re-using the same CSS

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth(); // Get the login function from context

  const { email, password } = formData;

  const onChange = e => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1
    try {
      const res = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
<<<<<<< HEAD
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to login');
      }
      
      // THIS IS THE FIX:
      // We pass the *entire* 'data' object (user info + token)
      // to our context, which will save it and redirect to the homepage.
      login(data);

=======
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Login failed');
      }

      // If login is successful, call the login function from context
      login(data.token);
      
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
<<<<<<< HEAD
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        
        {error && <p className="form-error">{error}</p>}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="form-btn">Login</button>
        
        <p className="form-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
=======
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="form-btn">Login</button>
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1
      </form>
    </div>
  );
}

export default Login;