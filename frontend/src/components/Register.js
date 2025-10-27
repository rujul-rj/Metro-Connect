// frontend/src/components/Register.js

import React, { useState } from 'react';
<<<<<<< HEAD
import { useNavigate, Link } from 'react-router-dom'; // <-- 1. Import Link
import './Form.css'; // This CSS file will style it
=======
import { useNavigate } from 'react-router-dom';
import './Form.css'; // We'll create a shared form CSS
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { username, email, password } = formData;

  const onChange = e => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
<<<<<<< HEAD
    setError(''); // Clear previous errors
=======
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    try {
<<<<<<< HEAD
=======
      // Remember we changed the port to 5001!
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1
      const res = await fetch('http://localhost:5001/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
<<<<<<< HEAD
        // Use 'message' from the backend (consistent with our other files)
        throw new Error(data.message || 'Registration failed');
=======
        throw new Error(data.msg || 'Registration failed');
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1
      }

      console.log('Registration successful:', data);
      navigate('/login'); // Redirect to login page
      
    } catch (err) {
      setError(err.message);
    }
  };

<<<<<<< HEAD
  // --- 2. THIS JSX IS NOW UPDATED TO MATCH FORM.CSS ---
  return (
    <div className="form-container">
      <form onSubmit={onSubmit} className="auth-form">
        <h2>Register Account</h2>
        
        {error && <p className="form-error">{error}</p>}
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            name="username" 
            id="username"
            value={username} 
            onChange={onChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email"
            value={email} 
            onChange={onChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password (6+ characters)</label>
          <input 
            type="password" 
            name="password" 
            id="password"
            value={password} 
            onChange={onChange} 
            required 
          />
        </div>
        
        <button type="submit" className="form-btn">Register</button>
        
        <p className="form-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
=======
  return (
    <div className="form-container">
      <h2>Register Account</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" value={username} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Password (6+ characters)</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="form-btn">Register</button>
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1
      </form>
    </div>
  );
}

export default Register;