import React, { useState, useEffect } from 'react';
import './UserDropdown.css';
import { Link, useNavigate } from 'react-router-dom';

function UserDropdown({ setCurrentUser }) {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch('http://localhost:5000/user-details', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setCurrentUser(data);
                        setCaloricGoal(data.caloricGoal); // Assuming 'caloricGoal' is part of the user data                    
                    } else {
                        // Handle error or logout user
                        handleLogout(); // If the token is invalid or expired
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserDetails();
    }, [setCurrentUser]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);  // Update the state to trigger a re-render
        navigate('/');  // Redirect to homepage
        window.location.reload();
    };

    return (
        <div className="dropdown">
            <div className="username">
                <button onClick={() => setIsOpen(!isOpen)}>
                    {username || 'Guest'}
                </button>
            </div>
            {isOpen && (
                <div className="dropdown-content">
                    <Link to="/account-settings">Account Settings</Link> 
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default UserDropdown;
