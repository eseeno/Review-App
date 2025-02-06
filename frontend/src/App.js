import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import React Router components
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Home from './components/Home'; 
import CreateReview from './components/CreateReview';
import ReviewDetails from './components/ReviewDetails';// New component for the main page

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in (e.g., check for a token in localStorage)
        const token = localStorage.getItem('token'); // Replace 'token' with your actual token key
        setIsLoggedIn(!!token); // Set isLoggedIn based on token presence

    }, []);

    const handleLogin = (token) => {
        localStorage.setItem('token', token); // Store the token
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token
        setIsLoggedIn(false);
    };

    return (
        <Router> {/* Wrap with Router */}
            <div className="App" style={{ 
                fontFamily: 'sans-serif', 
                backgroundColor: '#f4f4f4', 
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column'
               }}>
                <nav style={{ backgroundColor: '#333', color: '#eee', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to="/" style={{ color: '#eee', textDecoration: 'none', fontWeight: 'bold' }}>Review App</Link>
                    <div>
                        {!isLoggedIn && (
                            <>
                                <Link to="/login" style={{ color: '#eee', textDecoration: 'none', marginRight: '10px' }}>Login</Link>
                                <Link to="/register" style={{ color: '#eee', textDecoration: 'none' }}>Register</Link>
                            </>
                        )}
                        {isLoggedIn && <Logout onLogout={handleLogout} />}
                    </div>
                </nav>

                <main style={{ flexGrow: 1, padding: '20px' }}> {/* Add padding to the main content */}
                    <Routes> {/* Use Routes instead of Switch */}
                        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
                        <Route path="/create-review" element={<CreateReview />} /> 
                        <Route path="/reviews/:id" element={<ReviewDetails />} />
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
