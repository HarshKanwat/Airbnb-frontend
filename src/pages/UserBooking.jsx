// UserBookings.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import './UserBookings.css'; // Import the custom CSS file

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Please log in to view your bookings.');

        const response = await axiosInstance.get('/bookings/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data || []);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err.message || 'Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDeleteBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.delete(`/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.filter(booking => booking._id !== bookingId));
    } catch (err) {
      console.error('Error deleting booking:', err);
      setError('Failed to delete booking.');
    }
  };

  const handlePayment = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post('/payments/create-payment-intent', { bookingId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { clientSecret } = response.data;
      alert('Payment initiated (mock). Client Secret: ' + clientSecret);
    } catch (err) {
      console.error('Error initiating payment:', err);
      setError('Failed to initiate payment.');
    }
  };

  if (loading) return <div>Loading your bookings...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="user-bookings">
      <h2>Your Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id} className="booking-card card mb-3">
            <div className="card-body">
              <h4 className="card-title">{booking.property.name}</h4>
              <p className="card-text">
                <strong>Check-in:</strong> {new Date(booking.startDate).toLocaleDateString()}<br />
                <strong>Check-out:</strong> {new Date(booking.endDate).toLocaleDateString()}<br />
                <strong>Total Price:</strong> ${booking.totalPrice}
              </p>
              <button className="btn btn-primary" onClick={() => handlePayment(booking._id)}>Pay Now</button>
              <button className="btn btn-danger ms-2" onClick={() => handleDeleteBooking(booking._id)}>Cancel Booking</button>
            </div>
          </div>
        ))
      ) : (
        <p>You have no bookings yet.</p>
      )}
    </div>
  );
};

export default UserBookings;
