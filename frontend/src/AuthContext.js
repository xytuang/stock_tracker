// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        // Check if the user is authenticated
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/check');
                if (response.status === 200) {
                    setIsAuthenticated(true);
                }
                else {
                    setIsAuthenticated(false)
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
