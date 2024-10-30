import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Please log in to view your reviews.');

        const response = await axiosInstance.get('/user/reviews', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(response.data || []);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err.message || 'Failed to load reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserReviews();
  }, []);

  const handleDeleteReview = async (reviewId) => {
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.delete(`/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(reviews.filter((review) => review._id !== reviewId));
      alert('Review deleted successfully');
    } catch (err) {
      console.error('Error deleting review:', err);
      alert(err.message || 'Failed to delete review.');
    }
  };

  if (loading) return <div>Loading your reviews...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container">
      <h2>Your Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="review-item card mb-3">
            <div className="card-body">
              <h5 className="card-title">{review.property.name}</h5>
              <p className="card-text">Rating: {review.rating}</p>
              <p className="card-text">{review.text}</p>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteReview(review._id)}
              >
                Delete Review
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>You have no reviews yet.</p>
      )}
    </div>
  );
};

export default UserReviews;
