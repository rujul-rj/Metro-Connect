import React, { useState, useEffect } from 'react';
import './StationHub.js'; // We'll create this CSS file

function StationHub() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from your backend API
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
  }, []); // The empty array [] means this runs once on component mount

  if (loading) {
    return <h2>Loading stations...</h2>;
  }

  return (
    <div className="station-hub">
      <h2>Station Hub</h2>
      <div className="station-grid">
        {stations.map(station => (
          <div key={station._id} className="station-card">
            {/* Dynamically set line color */}
            <h3 style={{ borderBottom: `4px solid var(--color-${station.line.toLowerCase()})` }}>
              {station.name}
            </h3>
            <p><strong>Line:</strong> {station.line}</p>
            <p><strong>Crowd:</strong> {station.crowdLevel}</p>
            <p><strong>Facilities:</strong> {station.facilities.join(', ')}</p>
            <p><strong>Shops:</strong> {station.shops.length > 0 ? station.shops.join(', ') : 'None'}</p>
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

export default StationHub;