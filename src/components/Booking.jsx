import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Booking.css'; // Import custom CSS

const Booking = ({ propertyId, propertyPrice }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');
  const [bookingId, setBookingId] = useState(null); // Track booking ID
  const [apiUrl] = useState(import.meta.env.VITE_API_URL); // Use your API base URL

  // Effect to reset booking states when propertyId changes
  useEffect(() => {
    setBookingId(null);
    setCheckIn('');
    setCheckOut('');
    setBookingSuccess('');
    setError('');
  }, [propertyId]);

  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      setError('Please select both check-in and check-out dates.');
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setError('Check-out date must be after check-in date.');
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
        return;
      }
      
      const response = await axios.post(`${apiUrl}/bookings`, {
        property: propertyId,
        startDate: checkIn,
        endDate: checkOut,
        totalPrice,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookingSuccess('Booking confirmed! Your Booking ID is: ' + response.data._id);
      setBookingId(response.data._id); // Store booking ID
      setCheckIn('');
      setCheckOut('');
    } catch (error) {
      setError(error.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async () => {
    if (!bookingId) {
      setError('No booking to cancel.');
      return;
    }
    
    setLoading(true);
    setError('');
    setBookingSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to cancel this booking.');
        setLoading(false);
        return;
      }

      await axios.delete(`${apiUrl}/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setBookingSuccess('Booking canceled successfully.');
      setBookingId(null); // Clear booking ID after cancellation
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to cancel booking. Please try again.');
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
        disabled={loading || bookingSuccess}
      />
      <label htmlFor="check-out">Check-Out:</label>
      <input
        id="check-out"
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        disabled={loading || bookingSuccess}
      />
      
      {error && <p className="text-danger">{error}</p>}
      {bookingSuccess && <p className="text-success">{bookingSuccess}</p>}
      
      {!bookingSuccess ? (
        <button
          className="btn btn-primary"
          onClick={handleBooking}
          disabled={loading}
        >
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      ) : (
        <button
          className="btn btn-danger"
          onClick={cancelBooking}
          disabled={loading}
        >
          Cancel Booking
        </button>
      )}
    </div>
  );
};

export default Booking;
