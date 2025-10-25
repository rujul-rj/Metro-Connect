// frontend/src/components/Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css'; // We'll create a shared form CSS

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
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    try {
      // Remember we changed the port to 5001!
      const res = await fetch('http://localhost:5001/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Registration failed');
      }

      console.log('Registration successful:', data);
      navigate('/login'); // Redirect to login page
      
    } catch (err) {
      setError(err.message);
    }
  };

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
      </form>
    </div>
  );
}

export default Register;