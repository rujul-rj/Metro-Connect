// frontend/src/components/Login.js

import React, { useState } from 'react';
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
    try {
      const res = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Login failed');
      }

      // If login is successful, call the login function from context
      login(data.token);
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
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
      </form>
    </div>
  );
}

export default Login;