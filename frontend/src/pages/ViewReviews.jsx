import React, { useState, useEffect } from 'react';
import '../styles/view-review.css'; // Ensure you create this CSS file for styling

const BASE_URL = 'http://localhost:4000/api/v1'; // Update the base URL as per your server

const ViewReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${BASE_URL}/review`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Fetch error: ", error.message);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      const res = await fetch(`${BASE_URL}/review/${reviewId}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      // Filter out the deleted review from the state
      setReviews(reviews.filter(review => review._id !== reviewId));
    } catch (error) {
      console.error("Delete error: ", error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="title">All Reviews</h1>
      <div className="reviews">
        {reviews.map(review => (
          <div className="review" key={review._id}>
            <p><strong>Reviewer:</strong> {review.username}</p>
            <p><strong>Rating:</strong> {review.rating}</p>
            <p><strong>Comment:</strong> {review.reviewText}</p>
            <p><strong>Updated on:</strong> {new Date(review.createdAt).toLocaleDateString("en-US")}</p>
            {/* Add delete button */}
            <button onClick={() => deleteReview(review._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewReviews;
