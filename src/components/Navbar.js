import React from 'react';
import UserDropdown from './UserDropdown';
import { Link } from 'react-router-dom';
import image from './ShopEasyLogo.png';


function Navbar({ currentUser, setCurrentUser, setLoginModalOpen, setRegModalOpen }) {
    return (
        <div className="navbar">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <img className="navbar-logo" alt = "ShopEasy Logo" src = {image}></img>
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
