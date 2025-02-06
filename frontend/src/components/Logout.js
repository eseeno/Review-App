import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Logout({ onLogout }) {
    const handleLogout = () => {
        fetch('http://localhost:8000/api/logout/', { method: 'POST' })
        .then(res => {
            if (res.ok) {
                onLogout();
            } else {
                console.error('Logout failed');
            }
        });
    };

    return (
        <button onClick={handleLogout} className="btn btn-danger">
            Logout
        </button>
    );
}

export default Logout;
