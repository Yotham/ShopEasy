"use client"
import React, { useState, useEffect } from 'react';
import UserDropdown from './UserDropdown';
import Link from 'next/link'; // Import from next/link
import image from '../../public/ShopEasyLogoDark.png';
import RegistrationForm from './RegistrationForm';
import Modal from './Modal';
import dynamic from 'next/dynamic';
import { useAuth } from '../../context/AuthContext';

const LoginForm = dynamic(
    () => import('./LoginForm'),
    { ssr: false }
);
function Navbar() {
    const { 
        currentUser, 
        handleLogout, 
        setLoginModalOpen, 
        setRegModalOpen,
        isRegModalOpen,     // Get these from the context
        isLoginModalOpen    // Get these from the context
    } = useAuth();


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
                <UserDropdown setCurrentUser={currentUser} />
            ) : (
                <div className="auth-buttons">
                    <button
                        onClick={() => setLoginModalOpen(true)}
                        className="w-24 rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Login
                    </button>
                    <button
                        className="w-24 rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        onClick={() => setRegModalOpen(true)}
                    >
                        Register
                    </button>
                    
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
