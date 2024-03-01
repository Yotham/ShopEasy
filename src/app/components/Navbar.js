"use client"
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import dynamic from 'next/dynamic';

const UserDropdown = dynamic(() => import('./UserDropdown'));
const Modal = dynamic(() => import('./Modal'));
const RegistrationForm = dynamic(() => import('./RegistrationForm'));
const LoginForm = dynamic(() => import('./LoginForm'));

function Navbar() {
    const { 
        currentUser, 
        setLoginModalOpen, 
        setRegModalOpen,
        isRegModalOpen,     
        isLoginModalOpen    
    } = useAuth();

    return (
        <nav className="primary-bg text-white shadow-lg">
            <div className={!currentUser ? "max-w-6xl mx-auto px-4 py-5 flex justify-between items-center" : "mx-auto px-4 py-5 flex justify-between items-center flex-grow"}>
                <Link href={currentUser ? "/generate" : "/"} passHref className="text-3xl font-medium text-white flex items-center">
                        {/* Assuming you have the image in your public folder */}
                        {/* <img src="/img/ShopEasyLogo.png" alt="ShopEasy Logo" className="mr-3 h-16" /> */}
                        ShopEasy
                </Link>
                <div className="flex items-center">
                    {currentUser && (
                        <UserDropdown />
                    )}
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
