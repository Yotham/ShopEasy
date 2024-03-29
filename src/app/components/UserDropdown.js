"use client"

import React, { useState, useEffect } from 'react';
import './UserDropdown.css';
import Link from 'next/link';  // Import from next/link
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
function UserDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const {handleLogout } = useAuth(); // Destructure login from the context
    const { currentUser } = useAuth();
    const username = currentUser.username
    const logout = async () => {
        window.location.href = '/'
        await handleLogout();
        // Consider removing window.location.reload(); if you handle state correctly
    };
    return (
        <div className="dropdown">
            <div className="text-md bg-white hover:bg-slate-100 text-shopeasy-blue py-2 px-4 rounded mr-2">
                <button onClick={() => setIsOpen(!isOpen)}>
                    {username}
                </button>
            </div>
            {isOpen && (
                <div className="dropdown-content whitespace-nowrap">
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
