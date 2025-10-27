// frontend/src/components/FareCalculator.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Select from './Select'; // <-- 1. IMPORT CUSTOM SELECT
import './FareCalculator.css';

function FareCalculator() {
  const [stations, setStations] = useState([]);
  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');
  const [fare, setFare] = useState(null);
  const [error, setError] = useState('');
  const { token, refreshUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/stations');
        const data = await response.json();
        if (response.ok) {
          const validStations = data.filter(station => station && station.name);
          // Sort stations alphabetically for better UX
          validStations.sort((a, b) => a.name.localeCompare(b.name));
          setStations(validStations);
          if (validStations.length > 0) {
            setStartStation(validStations[0].name);
            setEndStation(validStations[0].name);
          }
        } else { setError('Could not fetch stations.'); }
      } catch (err) { setError('Server error while fetching stations.'); }
    };
    fetchStations();
  }, []);

  const handleCalculateFare = async (e) => {
      e.preventDefault();
      setError('');
      setFare(null);
      if (startStation === endStation) {
        setError('Start and End stations cannot be the same.');
        return;
      }
      try {
        const response = await fetch('http://localhost:5001/api/stations/calculate-fare', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ startStation, endStation }),
        });
        const data = await response.json();
        if (response.ok) { setFare(data.fare); }
        else { setError(data.message || 'Error calculating fare.'); }
      } catch (err) { setError('Server error. Please try again.'); }
  };

  const handleBooking = async () => {
      setError('');
      if (!token) { setError('You must be logged in to book a ticket.'); navigate('/login'); return; }
      if (fare === null || fare <= 0) { setError('Please calculate a valid fare first.'); return; }
      try {
        const res = await fetch('http://localhost:5001/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
          body: JSON.stringify({ startStation, endStation, fare }),
        });
        const data = await res.json();
        if (!res.ok) { throw new Error(data.message || 'Booking failed'); }
        refreshUser({ metroMoneyBalance: data.newBalance });
        navigate('/bookings');
      } catch (err) { setError(err.message); }
  };

  return (
    <motion.div
      className="fare-calculator-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Calculate Fare</h2>
      <form onSubmit={handleCalculateFare}>

        {/* --- 2. REPLACE <select> with <Select> --- */}
        <Select
          id="start-station"
          label="From:" // Pass label prop
          value={startStation}
          onChange={(e) => setStartStation(e.target.value)}
          required // Pass other props like required
        >
          {/* Options are passed as children */}
          {stations.map((station) => (
            <option key={`start-${station._id || station.name}`} value={station.name}>
              {station.name} ({station.line} Line)
            </option>
          ))}
        </Select>

        <Select
          id="end-station"
          label="To:" // Pass label prop
          value={endStation}
          onChange={(e) => setEndStation(e.target.value)}
          required
        >
          {/* Options are passed as children */}
          {stations.map((station) => (
            <option key={`end-${station._id || station.name}`} value={station.name}>
              {station.name} ({station.line} Line)
            </option>
          ))}
        </Select>
        {/* --- END OF REPLACEMENT --- */}

        <button type="submit" className="fare-btn fare-btn-primary">
          Calculate Fare
        </button>
      </form>

      {error && <p className="fare-error">{error}</p>}

      {fare !== null && (
        <motion.div
          className="fare-result"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3>Calculated Fare: <span className="fare-result-amount">₹{fare}</span></h3>
          <button
            onClick={handleBooking}
            className="fare-btn fare-btn-secondary"
          >
            Book Now
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default FareCalculator;

