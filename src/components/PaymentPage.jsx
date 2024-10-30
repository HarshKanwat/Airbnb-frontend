import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import '../styles/PaymentPage.css'; // Import custom CSS for styling

const PaymentPage = ({ bookingId }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axiosInstance.get(`/bookings/${bookingId}`);
        const { totalPrice } = response.data;
        setAmount(totalPrice);
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };
    fetchBookingDetails();
  }, [bookingId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPaymentStatus('');
    try {
      const response = await axiosInstance.post('/payments/create-payment-intent', {
        bookingId,
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
            value={amount} // This is now dynamically set
            readOnly // Keep it read-only for display purposes
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
          <label htmlFor="expiry">Expiry Date</label>
          <input
            type="text"
            id="expiry"
            name="expiry"
            value={cardDetails.expiry}
            onChange={handleInputChange}
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
