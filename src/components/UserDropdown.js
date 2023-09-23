// src/components/UserDropdown.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserDropdown.css';
import { useNavigate } from 'react-router-dom';
import AccountSettingsModal from '../AccountSettingsModal'; // Adjust the path accordingly

function UserDropdown({ setCurrentUser }) {
    const [isAccountSettingsModalOpen, setAccountSettingsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const username = currentUser ? currentUser.username : '';
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);  // Update the state to trigger a re-render
        navigate('/');  // Redirect to homepage
        window.location.reload();
    };

    return (
        <div className="dropdown">
            <button onClick={() => setIsOpen(!isOpen)}>
                {username}
            </button>
            {isOpen && (
                <div className="dropdown-content">
                    <button onClick={() => setAccountSettingsModalOpen(true)}>Account Settings</button>
                    <AccountSettingsModal 
                        isOpen={isAccountSettingsModalOpen} 
                        onClose={() => setAccountSettingsModalOpen(false)}
                    />

                    <button onClick={handleLogout}>Logout</button>
                    {/* Include other stats here if needed */}
                </div>
            )}
        </div>
    );
}

export default UserDropdown;
