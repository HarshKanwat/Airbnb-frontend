import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useParams } from 'react-router-dom';
import Booking from './Booking';
import PaymentPage from './PaymentPage';
import '../styles/PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewError, setReviewError] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance.get(`/reviews/${id}/reviews`);
      setReviews(response.data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviewError('Failed to load reviews. Please try again later.');
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axiosInstance.get(`/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property details:', error);
        setError('Failed to load property details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
    fetchReviews();
  }, [id]);

  const submitReview = async () => {
    if (!reviewText) {
      setReviewError('Please enter a review.');
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      setReviewError('Please log in to submit a review.');
      return;
    }
    try {
      await axiosInstance.post(`/reviews/${id}/reviews`, {
        text: reviewText,
        rating,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviewText('');
      setRating(5);
      fetchReviews(); // Refresh the list of reviews
    } catch (error) {
      console.error('Error submitting review:', error);
      setReviewError('Failed to submit review. Please try again.');
    }
  };

  const deleteReview = async (reviewId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setReviewError('Please log in to delete a review.');
      return;
    }
    try {
      await axiosInstance.delete(`/reviews/${id}/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchReviews(); // Refresh the list of reviews
    } catch (error) {
      console.error('Error deleting review:', error);
      setReviewError('Failed to delete review. Please try again.');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="property-details">
      <h1>{property?.name}</h1>
      {property?.images && property.images.length > 0 && (
        <img src={property.images[0]} alt={property.name} className="property-image" />
      )}
      <p>{property?.description}</p>
      <p><strong>${property?.price} per night</strong></p>

      <h3>Book This Property</h3>
      {!showPayment ? (
        <>
          <Booking propertyId={id} propertyPrice={property?.price} />
          <button 
            className="btn btn-primary mt-3" 
            onClick={() => setShowPayment(true)}
          >
            Proceed to Payment
          </button>
        </>
      ) : (
        <PaymentPage />
      )}

      <hr />

      <h3>Reviews</h3>
      {reviews.map(review => (
        <div key={review._id} className="review">
          <p>{review.text}</p>
          <p>Rating: {review.rating}</p>
          <button 
            className="btn btn-danger btn-sm" 
            onClick={() => deleteReview(review._id)}
          >
            Delete
          </button>
        </div>
      ))}
      <h4>Leave a Review</h4>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here"
        className="form-control"
      />
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="form-control">
        {[1, 2, 3, 4, 5].map(num => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
      {reviewError && <p className="text-danger">{reviewError}</p>}
      <button className="btn btn-primary" onClick={submitReview}>
        Submit
      </button>
    </div>
  );
};

export default PropertyDetails;
