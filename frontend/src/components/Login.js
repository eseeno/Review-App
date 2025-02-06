import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); 

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null); 

        fetch('http://localhost:8000/api/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                console.log('Login successful:', data);
                onLogin(); 
            }
        })
        .catch(err => {
            setError("An error occurred during login.");
            console.error("Login error:", err);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3" style={{ width: '300px' }}>
            {error && <p className="text-danger">{error}</p>}
            <input type="text" className="form-control" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
            <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    );
}

export default Login;
