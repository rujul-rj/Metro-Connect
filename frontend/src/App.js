// frontend/src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// --- ADD ALL MISSING IMPORTS ---
import HomePage from './components/HomePage';
import StationHub from './components/StationHub';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import FareCalculator from './components/FareCalculator';
import ProtectedRoute from './components/ProtectedRoute';
import BookingPage from './components/BookingPage';
import LiveMapPage from './components/LiveMapPage';
import MetroMoneyPage from './components/MetroMoneyPage';
import SettingsPage from './components/SettingsPage';
import LostFoundPage from './components/LostFoundPage';
// --- END OF IMPORTS ---

import './App.css'; // Global App styles

function App() {
  return (
    <div className="App">
      {/* Navbar is always visible */}
      <Navbar />

      {/* Main content area with padding */}
      <main className="container">
        {/* Route definitions */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/stations" element={<StationHub />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/farecalculator" element={<FareCalculator />} />
          <Route path="/lostfound" element={<LostFoundPage />} />

          {/* Protected Routes Wrapper */}
          <Route element={<ProtectedRoute />}>
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/map" element={<LiveMapPage />} />
            <Route path="/money" element={<MetroMoneyPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* Add favorites route here later */}
          </Route>

          {/* Optional: Add a 404 Not Found route */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}

        </Routes>
      </main>
    </div>
  );
}

export default App;

