// frontend/src/App.js
<<<<<<< HEAD
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
=======

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StationHub from './components/StationHub';
import Register from './components/Register'; // <-- IMPORT
import Login from './components/Login'; // <-- IMPORT
import Navbar from './components/Navbar'; // <-- IMPORT
import './App.css'; 
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
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

=======
      <Navbar /> {/* <-- Your navigation bar will be on every page */}
      
      <main className="container">
        <Routes>
          <Route path="/" element={<StationHub />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* You will add more routes here, like /fare-calculator */}
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1
        </Routes>
      </main>
    </div>
  );
}

<<<<<<< HEAD
export default App;

=======
// You can add this to App.css to make it look clean
/*
.container {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1rem;
}
*/

export default App;
// You can create App.css to style the header
// frontend/src/App.css
/*
.app-header {
  background: var(--color-red);
  color: white;
  padding: 10px 20px;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 20px;
}
*/



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1
