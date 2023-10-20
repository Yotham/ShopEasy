import React from 'react';
import UserDropdown from './UserDropdown';
import { Link } from 'react-router-dom';

function Navbar({ currentUser, setCurrentUser, setLoginModalOpen, setRegModalOpen }) {
    return (
        <div className="navbar">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1 className="navbar-title">ShopEasy</h1>
            </Link>
            {currentUser ? (
                 <UserDropdown setCurrentUser={setCurrentUser} />
            ) : (
                <div className="auth-buttons">
                    <button className="nav-btn" onClick={() => setLoginModalOpen(true)}>Login</button>
                    <button className="nav-btn" onClick={() => setRegModalOpen(true)}>Register</button>
                </div>
            )}
        </div>
    );
}

export default Navbar;
