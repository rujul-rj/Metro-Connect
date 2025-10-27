<<<<<<< HEAD
// frontend/src/components/StationHub.js

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // <-- 1. Import motion
import './StationHub.css'; 
=======
import React, { useState, useEffect } from 'react';
import './StationHub.js'; // We'll create this CSS file
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1

function StationHub() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
<<<<<<< HEAD
=======
    // Fetch data from your backend API
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1
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
<<<<<<< HEAD
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
=======
  }, []); // The empty array [] means this runs once on component mount
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1

  if (loading) {
    return <h2>Loading stations...</h2>;
  }

  return (
<<<<<<< HEAD
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
=======
    <div className="station-hub">
      <h2>Station Hub</h2>
      <div className="station-grid">
        {stations.map(station => (
          <div key={station._id} className="station-card">
            {/* Dynamically set line color */}
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1
            <h3 style={{ borderBottom: `4px solid var(--color-${station.line.toLowerCase()})` }}>
              {station.name}
            </h3>
            <p><strong>Line:</strong> {station.line}</p>
            <p><strong>Crowd:</strong> {station.crowdLevel}</p>
            <p><strong>Facilities:</strong> {station.facilities.join(', ')}</p>
            <p><strong>Shops:</strong> {station.shops.length > 0 ? station.shops.join(', ') : 'None'}</p>
<<<<<<< HEAD
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

=======
          </div>
        ))}
      </div>
    </div>
  );
}

// Create frontend/src/components/StationHub.css for styling
/*
.station-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
.station-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
  transition: transform 0.2s;
}
.station-card:hover {
  transform: translateY(-5px);
}
.station-card h3 {
  margin-top: 0;
  padding-bottom: 10px;
  color: var(--color-dark);
}
*/

>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1
export default StationHub;