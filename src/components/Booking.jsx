import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Booking.css'; // Import custom CSS

const Booking = ({ propertyId }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBooking = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`/api/bookings`, {
        propertyId,
        checkIn,
        checkOut,
      });
      alert('Booking confirmed!');
    } catch (error) {
      console.error('Booking error:', error);
      setError('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form">
      <h3>Book This Property</h3>
      <label>Check-In:</label>
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
      />
      <label>Check-Out:</label>
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
      />
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-primary" onClick={handleBooking} disabled={loading}>
        {loading ? 'Booking...' : 'Confirm Booking'}
      </button>
    </div>
  );
};

export default Booking;
