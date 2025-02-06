import React, { useState } from 'react';
import './CreateReview.css'; // You can create a CSS file for styling

function CreateReview() {
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(3); // Default rating to 3
    const [comment, setComment] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', null

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        setSubmissionStatus('pending'); // Show pending status

        const reviewData = {
            category: category,
            rating: parseInt(rating), // Ensure rating is an integer
            comment: comment,
        };

        try {
            const response = await fetch('http://backend:8000/api/reviews/', { // POST request to create review
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // You might need to include authorization headers here if your API requires login
                },
                body: JSON.stringify(reviewData),
            });

            if (response.ok) {
                setSubmissionStatus('success'); // Set success status
                // Optionally clear the form after successful submission
                setCategory('');
                setRating(3);
                setComment('');
                // Optionally redirect user or show a success message
                console.log('Review created successfully!');
            } else {
                setSubmissionStatus('error'); // Set error status
                const errorData = await response.json(); // Or response.text() if not JSON
                console.error('Error creating review:', errorData);
            }
        } catch (error) {
            setSubmissionStatus('error'); // Set error status on fetch error
            console.error('Fetch error:', error);
        }
    };

    return (
        <div className="create-review-container"> {/* Apply CSS class for styling */}
            <h2>Create a Review</h2>
            {submissionStatus === 'success' && (
                <p className="success-message">Review submitted successfully!</p>
            )}
            {submissionStatus === 'error' && (
                <p className="error-message">Error submitting review. Please try again.</p>
            )}
            <form onSubmit={handleSubmit} className="review-form"> {/* Apply CSS class for form styling */}
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Rating (1-5):</label>
                    <input
                        type="number"
                        id="rating"
                        className="form-control"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                        id="comment"
                        className="form-control"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="4"
                        required
                    />
                </div>
                <button type="submit" className="submit-button" disabled={submissionStatus === 'pending'}>
                    {submissionStatus === 'pending' ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
}

export default CreateReview;