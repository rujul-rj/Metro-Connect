// frontend/src/components/StationHub.js

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // <-- 1. Import motion
import './StationHub.css'; 

function StationHub() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/api/stations')
      .then(response => response.json())
      .then(data => {
        setStations(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching stations:', error);
        setLoading(false);
      });
  }, []); 

  // --- 2. Animation Variants ---
  // This defines the "container" animation
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // This makes each child animate 0.1s after the previous
      }
    }
  };

  // This defines the animation for each "card"
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  if (loading) {
    return <h2>Loading stations...</h2>;
  }

  return (
    <motion.div // <-- 3. Use motion.div here
      className="station-hub"
      // This will make the whole component fade in on load
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Station Hub</h2>
      
      {/* 4. Use motion.div for the grid and apply variants */}
      <motion.div 
        className="station-grid"
        variants={gridContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {stations.map(station => (
          
          // 5. Use motion.div for the card and apply variants
          <motion.div 
            key={station._id} 
            className="station-card"
            variants={cardVariants}
            // No initial/animate needed here, the parent handles it
          >
            <h3 style={{ borderBottom: `4px solid var(--color-${station.line.toLowerCase()})` }}>
              {station.name}
            </h3>
            <p><strong>Line:</strong> {station.line}</p>
            <p><strong>Crowd:</strong> {station.crowdLevel}</p>
            <p><strong>Facilities:</strong> {station.facilities.join(', ')}</p>
            <p><strong>Shops:</strong> {station.shops.length > 0 ? station.shops.join(', ') : 'None'}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default StationHub;