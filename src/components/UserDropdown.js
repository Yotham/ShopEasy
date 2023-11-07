import React, { useState, useEffect } from 'react';
import './UserDropdown.css';
import { Link, useNavigate } from 'react-router-dom';

function UserDropdown({ setCurrentUser }) {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('http://localhost:5000/user/data', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setCurrentUser(data);
                    setUsername(data.username);
                } else {
                    console.error('Failed to fetch user data:', response.status);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, );
    

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
                    {username}
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
