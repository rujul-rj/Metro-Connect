// frontend/src/components/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './HomePage.css'; 

// --- UPDATED Letter Animation Variants ---
const letterVariants = {
  hover: { // State when hovered
    scale: 1.2, // Make it 20% bigger
    y: -5,      // Lift it up slightly
    color: 'var(--color-primary)', // Change to primary orange color
    transition: { type: 'spring', stiffness: 400, damping: 12 }
  },
  rest: { // Default state
    scale: 1,
    y: 0,
    color: 'var(--text-primary)', // Use default text color
    transition: { type: 'spring', stiffness: 400, damping: 12 }
  }
};
// --- END of Variants ---


function HomePage() {
  const title = "Welcome to Namma Metro Portal";
  const titleLetters = title.split(""); 

  return (
    <motion.div 
      className="home-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="home-hero">
        
        <h1 
          className="home-hero-h1 interactive-title" 
          aria-label={title} 
        >
          {titleLetters.map((letter, index) => (
            <motion.span 
              key={`${letter}-${index}`}
              variants={letterVariants}
              initial="rest" 
              whileHover="hover" 
              className="interactive-title-letter" 
            >
              {letter === ' ' ? '\u00A0' : letter} 
            </motion.span>
          ))}
        </h1>

        <p>Your guide to navigating Bangalore's metro system with ease.</p>
        <div className="home-cta-buttons">
          <Link to="/stations" className="home-btn home-btn-primary">
            Explore Stations
          </Link>
          <Link to="/farecalculator" className="home-btn home-btn-secondary">
            Check Fare
          </Link>
           <Link to="/map" className="home-btn home-btn-secondary">
            View Map
          </Link>
        </div>
      </header>

      <section className="home-features">
        <h2>Features</h2>
        <div className="features-grid">
           <motion.div className="feature-card" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <h3>🚉 Station Hub</h3>
            <p>Browse detailed information for all stations, including lines, facilities, shops, and crowd levels.</p>
             <Link to="/stations" className="feature-link">Go to Stations →</Link>
          </motion.div>
          <motion.div className="feature-card" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <h3>💸 Fare Calculator</h3>
            <p>Quickly calculate the exact fare between any two stations based on the official BMRCL structure.</p>
             <Link to="/farecalculator" className="feature-link">Calculate Fare →</Link>
          </motion.div>
          <motion.div className="feature-card" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <h3>🗺️ Network Map</h3>
            <p>Visualize the entire Namma Metro network with our interactive map showing lines and stations.</p>
             <Link to="/map" className="feature-link">View Map →</Link>
          </motion.div>
           <motion.div className="feature-card" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <h3>🎟️ Booking & Wallet</h3>
            <p>Book tickets directly after calculating fare and manage your Metro Money balance.</p>
             <Link to="/bookings" className="feature-link">My Bookings →</Link>
          </motion.div>
           <motion.div className="feature-card" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <h3>⚙️ Account Settings</h3>
            <p>Update your profile information and manage your account password securely.</p>
             <Link to="/settings" className="feature-link">Go to Settings →</Link>
          </motion.div>
           <motion.div className="feature-card" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <h3>🌓 Light/Dark Mode</h3>
            <p>Switch between light and dark themes for comfortable viewing, day or night.</p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

export default HomePage;