"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
        <nav className="primary-bg text-white shadow-lg border-b-4">
            <div className={!currentUser ? " px-4 py-5 flex justify-between items-center flex-grow" : "mx-auto px-4 py-5 flex justify-between items-center flex-grow"}>
                <Link href={currentUser ? "/generate" : "/"} passHref className="text-3xl font-medium text-white flex items-center">
                        {/* Assuming you have the image in your public folder */}
                        <Image src="/img/ShopEasyLogo.png" alt="ShopEasy Logo" className="mr-3 h-16" width={72} height={24} />
                        ShopEasy
                </Link>
                {currentUser && (
                    <div className="flex items-center">
                            <UserDropdown />
                    </div>
                )}
                { !currentUser && (
                    <div className="inline-flex">
                        <button onClick={() => setRegModalOpen(true)} className="bg-white text-shopeasy-blue text-sm font-medium py-2 px-4 rounded-lg mr-2">Sign Up</button>
                        <button onClick={() => setLoginModalOpen(true)} className="bg-white text-shopeasy-blue text-sm font-medium py-2 px-4 rounded-lg">Login</button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
