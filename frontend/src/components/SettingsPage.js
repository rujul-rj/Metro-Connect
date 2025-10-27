// frontend/src/components/SettingsPage.js

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import './SettingsPage.css'; // <-- We'll create this CSS

function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      className="settings-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Settings</h2>
      
      <div className="settings-card">
        <h3>Appearance</h3>
        <div className="setting-item">
          <label htmlFor="theme-toggle">Dark Mode</label>
          
          {/* This is the same toggle switch from your navbar */}
          <label className="theme-switch">
            <input
              id="theme-toggle"
              type="checkbox"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            <span className="slider"></span>
          </label>
        </div>
        {/* You can add more settings here, like language */}
      </div>

      <div className="settings-card">
        <h3>Account</h3>
        <div className="setting-item">
          <span>Manage Profile</span>
          <button className="settings-btn">Edit Profile</button>
        </div>
        <div className="setting-item">
          <span>Change Password</span>
          <button className="settings-btn">Change</button>
        </div>
      </div>

    </motion.div>
  );
}

export default SettingsPage;