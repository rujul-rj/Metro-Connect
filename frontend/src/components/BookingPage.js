// frontend/src/components/BookingPage.js

import React from 'react';
// frontend/src/components/BookingPage.js
import { useState, useEffect } from 'react'; // Ensure these are imported
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link
// Import some simple icons (Make sure to install react-icons: yarn add react-icons)
import { FaMapMarkerAlt, FaTicketAlt, FaRupeeSign, FaCalendarAlt } from 'react-icons/fa';
import './BookingPage.css'; // Updated CSS

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      // ... (fetch logic remains the same) ...
       try {
        const res = await fetch('http://localhost:5001/api/bookings/mybookings', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Could not fetch bookings');
        setBookings(data);
      } catch (err) { setError(err.message); }
      finally { setLoading(false); }
    };
    fetchBookings();
  }, [token]);

  // Animation variants for the list and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };


  if (loading) return <p className="loading-message">Loading your tickets...</p>;
  if (error) return <p className="page-error">{error}</p>;

  return (
    <motion.div
      className="booking-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2><FaTicketAlt /> My Bookings</h2>

      {bookings.length === 0 ? (
        <motion.div className="no-bookings" variants={itemVariants} initial="hidden" animate="visible">
          <p>You haven't booked any tickets yet.</p>
          <Link to="/farecalculator" className="btn-primary">
            Book Your First Ticket
          </Link>
        </motion.div>
      ) : (
        <motion.div
          className="bookings-grid" // Changed to grid
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {bookings.map((booking) => (
            <motion.div
              key={booking._id}
              className="pretty-ticket-card"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }} // Add hover effect
            >
              <div className="ticket-main-info">
                 <div className="ticket-stations">
                    <span className="station-label"><FaMapMarkerAlt /> From:</span>
                    <span className="station-name">{booking.startStation}</span>
                 </div>
                 <div className="ticket-stations">
                    <span className="station-label"><FaMapMarkerAlt /> To:</span>
                    <span className="station-name">{booking.endStation}</span>
                 </div>
              </div>
              <div className="ticket-details">
                <div className="detail-item">
                  <FaRupeeSign /> Fare: <span>₹{booking.fare}</span>
                </div>
                <div className="detail-item">
                  <FaTicketAlt /> Ticket ID: <span>{booking.ticketId}</span>
                </div>
                <div className="detail-item">
                   <FaCalendarAlt /> Booked: <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default BookingPage;
