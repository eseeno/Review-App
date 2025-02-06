import React, { useState, useEffect } from 'react';
import CreateReview from './CreateReview';
import ReviewDetails from './ReviewDetails'; 

function Home({ isLoggedIn }) { // Receive isLoggedIn as a prop
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://backend:8000/api/reviews/')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Recent Reviews</h1>
            {reviews.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {reviews.map(review => (
                        <li key={review.id} style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '20px', borderRadius: '5px', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }}>
                            <h2 style={{ color: '#333', marginBottom: '10px' }}>{review.category}</h2> {/* ✅ Using category */}
                            <p style={{ color: '#666', marginBottom: '5px' }}>Category: {review.category}</p> {/* ✅ Redundant line removed */}
                            <p style={{ color: '#666', marginBottom: '5px' }}>Rating: {review.rating}</p>
                            <p style={{ color: '#333', marginBottom: '10px' }}>{review.comment}</p> {/* ✅ Using comment */}
                            <p style={{ color: '#999' }}>By: {review.user} at {new Date(review.created_at).toLocaleString()}</p> {/* ✅ Formatted date and corrected username field */}
                        </li>
                    ))}
                </ul>
            )}
            {/* Conditionally render the "Create Review" button */}
            {isLoggedIn && (
                <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    CreateReview 
                </button>
            )}
        </div>
    );
}

export default Home;