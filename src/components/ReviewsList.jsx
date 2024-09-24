import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Reviews.css'; // Import custom CSS

const Reviews = ({ propertyId }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/properties/${propertyId}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews', error);
        setError('Failed to load reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [propertyId]);

  const submitReview = async () => {
    try {
      await axios.post(`/api/properties/${propertyId}/reviews`, {
        text: reviewText,
        rating,
      });
      setReviewText('');
      setRating(5);
      alert('Review submitted!');
    } catch (error) {
      console.error('Error submitting review', error);
      setError('Failed to submit review. Please try again.');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="reviews-section">
      <h4>Reviews</h4>
      {reviews.map(review => (
        <div key={review._id} className="review">
          <p>{review.text}</p>
          <p>Rating: {review.rating}</p>
        </div>
      ))}

      <h5>Leave a Review</h5>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here"
      />
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        {[...Array(5)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-primary" onClick={submitReview}>
        Submit
      </button>
    </div>
  );
};

export default Reviews;
