import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ReviewDetails({ review }) {
    if (!review) {
        return <p>Loading review details...</p>;
    }

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Review Details</h3>
            <div className="list-group">
                <div className="list-group-item">
                    <strong>Category:</strong> {review.category}
                </div>
                <div className="list-group-item">
                    <strong>Rating:</strong> {review.rating} / 5
                </div>
                <div className="list-group-item">
                    <strong>Comment:</strong> {review.comment}
                </div>
                <div className="list-group-item">
                    <strong>By:</strong> {review.user}
                </div>
                <div className="list-group-item">
                    <strong>Created At:</strong> {new Date(review.created_at).toLocaleString()}
                </div>
            </div>
        </div>
    );
}

export default ReviewDetails;
