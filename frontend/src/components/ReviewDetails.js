import React from 'react';
import './ReviewDetails.css'; // You can create a CSS file for styling

function ReviewDetails({ review }) {
    if (!review) {
        return <p>Loading review details...</p>; // Or "No review selected"
    }

    return (
        <div className="review-details-container"> {/* Apply CSS class for styling */}
            <h3>Review Details</h3>
            <div className="detail-item">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{review.category}</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Rating:</span>
                <span className="detail-value">{review.rating} / 5</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Comment:</span>
                <span className="detail-value">{review.comment}</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">By:</span>
                <span className="detail-value">{review.user}</span> {/* Assuming serializer is sending username in 'user' field */}
            </div>
            <div className="detail-item">
                <span className="detail-label">Created At:</span>
                <span className="detail-value">{new Date(review.created_at).toLocaleString()}</span> {/* Format date nicely */}
            </div>
        </div>
    );
}

export default ReviewDetails;