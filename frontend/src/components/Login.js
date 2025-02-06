import React, { useState } from 'react';

function Login({ onLogin }) {  // Add onLogin prop
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State for error message

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null); // Clear any previous errors

        fetch('http://backend:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                setError(data.error); // Set error message
            } else {
                // Store token or user data (e.g., in localStorage)
                console.log('Login successful:', data);
                onLogin(); // Call the onLogin callback
            }
        })
        .catch(err => {
            setError("An error occurred during login."); // Set a general error message
            console.error("Login error:", err);
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}> {/* Added styling */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Login</button>
    </form>
    );
}

export default Login;