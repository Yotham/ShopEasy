"use client"
import React, { useState, useEffect } from 'react';
import UserDropdown from './UserDropdown';
import Link from 'next/link'; // Import from next/link
import image from '../../public/ShopEasyLogoDark.png';
import RegistrationForm from './RegistrationForm';
import Modal from './Modal';
import dynamic from 'next/dynamic';

const LoginForm = dynamic(
    () => import('./LoginForm'),
    { ssr: false }
);
function Navbar({ isRegModalOpen, setRegModalOpen, isLoginModalOpen, setLoginModalOpen  }) {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch('/api/user/data', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setCurrentUser(data);
                    } else {
                        console.error('Failed to fetch user data:', response.status);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, []);
    return (
        <div className="navbar">
            {currentUser ? (
                <Link href="/generate"> {/* Change to href */}
                        <img className="navbar-logo" alt="ShopEasy Logo" src={image.src} />
                </Link>
            ) : (
                <Link href="/"> {/* Change to href */}
                        <img className="navbar-logo" alt="ShopEasy Logo" src={image.src} />
                </Link>
            )}

            {currentUser ? (
                <UserDropdown setCurrentUser={setCurrentUser} />
            ) : (
                <div className="auth-buttons">
                    <button className="nav-btn" onClick={() => setLoginModalOpen(true)}>Login</button>
                    <button className="nav-btn" onClick={() => setRegModalOpen(true)}>Register</button>
                    
                </div>
            )}
                <Modal isOpen={isRegModalOpen} onClose={() => setRegModalOpen(false)} title="Register">
                    <RegistrationForm setRegModalOpen={setRegModalOpen} />
                </Modal>
                <Modal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} title="Login">
                    <LoginForm setLoginModalOpen={setLoginModalOpen} />
                </Modal>
        </div>
    );
}

export default Navbar;
