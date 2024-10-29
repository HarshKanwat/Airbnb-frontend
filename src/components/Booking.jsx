import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Booking.css'; // Import custom CSS

const Booking = ({ propertyId, propertyPrice }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL; // Use your API base URL

  const handleBooking = async () => {
    console.log('Booking started...', { property: propertyId, checkIn, checkOut });
    if (!checkIn || !checkOut) {
      setError('Please select both check-in and check-out dates.');
      console.log('Date error:', 'Please select both check-in and check-out dates.');
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setError('Check-out date must be after check-in date.');
      console.log('Date error:', 'Check-out date must be after check-in date.');
      return;
    }

    const nights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
    const totalPrice = nights * propertyPrice;

    setLoading(true);
    setError('');
    setBookingSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to book this property.');
        setLoading(false);
        console.log('Auth error:', 'No token found. Please log in.');
        return;
      }

      console.log('Making request to:', `${apiUrl}/bookings`);
      const response = await axios.post(`${apiUrl}/bookings`, {
        property: propertyId,
        startDate: checkIn,
        endDate: checkOut,
        totalPrice
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Booking successful:', response.data);
      setBookingSuccess('Booking confirmed!');
      setCheckIn('');
      setCheckOut('');
    } catch (error) {
      console.error('Booking error:', error.response ? error.response.data : error);
      setError(error.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form">
      <h3>Book This Property</h3>
      <label htmlFor="check-in">Check-In:</label>
      <input
        id="check-in"
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        aria-label="Check-In Date"
        disabled={loading}
      />
      <label htmlFor="check-out">Check-Out:</label>
      <input
        id="check-out"
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        aria-label="Check-Out Date"
        disabled={loading}
      />
      {error && <p className="text-danger">{error}</p>}
      {bookingSuccess && <p className="text-success">{bookingSuccess}</p>}
      <button
        className="btn btn-primary"
        onClick={handleBooking}
        disabled={loading}
        aria-label="Confirm Booking"
      >
        {loading ? 'Booking...' : 'Confirm Booking'}
      </button>
    </div>
  );
};

export default Booking;
