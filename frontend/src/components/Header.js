import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const Header = ({title}) => {

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
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h3>{title}</h3>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Header