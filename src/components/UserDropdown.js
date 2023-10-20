import React, { useState } from 'react';
import './UserDropdown.css';
import { Link, useNavigate } from 'react-router-dom';  // Import the Link component

function UserDropdown({ setCurrentUser }) {
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
                    <Link to="/account-settings">Account Settings</Link>  {/* New link to the account settings page */}
                    <button onClick={handleLogout}>Logout</button>
                    {/* Include other stats here if needed */}
                </div>
            )}
        </div>
    );
}

export default UserDropdown;
