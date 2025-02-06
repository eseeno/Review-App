import React from 'react';

function Logout({ onLogout }) {
    const handleLogout = () => {
        fetch('http://backend:8000/api/logout/', {
            method: 'POST'
        })
        .then(res => {
            if (res.ok) {
                onLogout();
            } else {
                console.error('Logout failed');
            }
        });
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default Logout;