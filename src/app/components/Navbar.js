"use client"
import React, { useState, useEffect } from 'react';
import UserDropdown from './UserDropdown';
import Link from 'next/link'; // Import from next/link
import image from '../../../public/img/ShopEasyLogo.png'
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Modal from './Modal';
import dynamic from 'next/dynamic';
import { useAuth } from '../context/AuthContext';

// import LoginForm from './LoginForm'

function Navbar() {
    const { 
        currentUser, 
        setLoginModalOpen, 
        setRegModalOpen,
        isRegModalOpen,     // Get these from the context
        isLoginModalOpen    // Get these from the context
    } = useAuth();

    return (
        <nav className="bg-gray-800 text-white px-4 py-6">
            <div className="flex-grow flex justify-between items-center mx-auto">
                <Link href={currentUser ? "/generate" : "/"}>
                    <img className="flex h-28" alt="ShopEasy Logo" src={image.src} />
                </Link>
                <div className="mr-0 flex">
                    {currentUser ? (
                        <UserDropdown/>
                    ) : (
                        <div>
                            <button className="text-xl bg-slate-200 hover:bg-slate-300 text-black font-bold py-2 px-4 rounded mr-4" onClick={() => setLoginModalOpen(true)}>
                                Login
                            </button>
                            <button className="text-xl bg-slate-200 hover:bg-slate-300 text-black font-bold py-2 px-4 rounded" onClick={() => setRegModalOpen(true)}>
                                Register
                            </button>
                        </div>
                    )}
                </div>
                <Modal isOpen={isRegModalOpen} onClose={() => setRegModalOpen(false)} title="Register">
                <RegistrationForm setRegModalOpen={setRegModalOpen} />
                </Modal>
                <Modal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} title="Login">
                    <LoginForm setLoginModalOpen={setLoginModalOpen} />
                </Modal>
            </div>

        </nav>
    );
}

export default Navbar;
