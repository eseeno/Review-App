import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateReview() {
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(3);
    const [comment, setComment] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmissionStatus('pending');

        const reviewData = { category, rating: parseInt(rating), comment };

        try {
            const response = await fetch('http://localhost:8000/api/reviews/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });

            if (response.ok) {
                setSubmissionStatus('success');
                setCategory('');
                setRating(3);
                setComment('');
            } else {
                setSubmissionStatus('error');
                const errorData = await response.json();
                console.error('Error:', errorData);
            }
        } catch (error) {
            setSubmissionStatus('error');
            console.error('Fetch error:', error);
        }
    };

    return (
        <div className="container">
            <h2>Create a Review</h2>
            {submissionStatus === 'success' && <p className="text-success">Review submitted successfully!</p>}
            {submissionStatus === 'error' && <p className="text-danger">Error submitting review. Please try again.</p>}
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category:</label>
                    <input
                        type="text"
                        id="category"
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Rating (1-5):</label>
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
                <div className="mb-3">
                    <label htmlFor="comment" className="form-label">Comment:</label>
                    <textarea
                        id="comment"
                        className="form-control"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="4"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={submissionStatus === 'pending'}>
                    {submissionStatus === 'pending' ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
}

export default CreateReview;
