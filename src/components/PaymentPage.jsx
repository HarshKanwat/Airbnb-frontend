import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import '../styles/PaymentPage.css'; // Import custom CSS for styling

const PaymentPage = ({ bookingId }) => {
  const [amount, setAmount] = useState(0); // Initialize amount to 0
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!bookingId) return; // Ensure bookingId is available

      try {
        const response = await axiosInstance.get(`/bookings/${bookingId}`);
        const { totalPrice } = response.data; // Assuming totalPrice is part of the booking response
        setAmount(totalPrice);
      } catch (error) {
        console.error('Error fetching booking details:', error);
        setPaymentStatus('Failed to fetch booking details.');
      }
    };
    fetchBookingDetails();
  }, [bookingId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const validateCardDetails = () => {
    const { cardNumber, expiry, cvv } = cardDetails;
    const cardNumberRegex = /^\d{16}$/; // Simple regex for 16-digit card number
    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/; // MM/YY format
    const cvvRegex = /^[0-9]{3,4}$/; // 3 or 4 digit CVV

    if (!cardNumberRegex.test(cardNumber)) {
      setPaymentStatus('Invalid card number. Please enter a 16-digit number.');
      return false;
    }
    if (!expiryRegex.test(expiry)) {
      setPaymentStatus('Invalid expiry date. Please use MM/YY format.');
      return false;
    }
    if (!cvvRegex.test(cvv)) {
      setPaymentStatus('Invalid CVV. Please enter a 3 or 4 digit number.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCardDetails()) {
      return; // Prevent submission if validation fails
    }
    setLoading(true);
    setPaymentStatus('');

    try {
      const response = await axiosInstance.post('/payments/create-payment-intent', {
        bookingId, // Send the booking ID
        amount, // Send the fetched amount for payment processing
        cardDetails // Include card details (if needed)
      });

      if (response.data.success) {
        setPaymentStatus('Payment Successful!');
      } else {
        setPaymentStatus('Payment Failed. Try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('Payment Failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <h2>Make a Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={amount}
            readOnly
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiry">Expiry Date (MM/YY)</label>
          <input
            type="text"
            id="expiry"
            name="expiry"
            value={cardDetails.expiry}
            onChange={handleInputChange}
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
      {paymentStatus && <p className={paymentStatus.includes('Successful') ? 'success' : 'error'}>{paymentStatus}</p>}
    </div>
  );
};

export default PaymentPage;
