import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home({ isLoggedIn }) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/reviews/')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);

    return (
        <div className="container text-center">
            <h1 className="my-4">Recent Reviews</h1>
            {reviews.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                <ul className="list-unstyled">
                    {reviews.map(review => (
                        <li key={review.id} className="border rounded-3 shadow-sm p-4 mb-4">
                            <h2 className="text-dark mb-2">{review.category}</h2>
                            <p className="text-muted mb-2">Rating: {review.rating} / 5</p>
                            <p className="text-dark mb-3">{review.comment}</p>
                            <p className="text-muted">By: {review.user} at {new Date(review.created_at).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
            {isLoggedIn && (
                <Link to="/create-review">CreateReview</Link>
            )}
        </div>
    );
}

export default Home;
