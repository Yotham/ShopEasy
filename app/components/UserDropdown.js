"use client"

import React, { useState, useEffect } from 'react';
import './UserDropdown.css';
import Link from 'next/link';  // Import from next/link
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
function UserDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const {handleLogout } = useAuth(); // Destructure login from the context
    const router = useRouter();
    const { currentUser } = useAuth();
    const username = currentUser.username
    const logout = async () => {
        await handleLogout();
        router.push('/');  // Redirect to homepage using useRouter
        // Consider removing window.location.reload(); if you handle state correctly
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
                    <Link href="/account-settings">
                        Account Settings  {/* Use anchor tags inside Link */}
                    </Link> 
                    <button onClick={logout}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default UserDropdown;
