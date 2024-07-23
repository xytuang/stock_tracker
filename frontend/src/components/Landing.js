// Landing.js
import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const Landing = () => {
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/auth/logout', {}, { withCredentials: true });
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div>
            <h1>Welcome to the Landing Page</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Landing;
