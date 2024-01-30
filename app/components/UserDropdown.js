"use client"

import React, { useState, useEffect } from 'react';
import './UserDropdown.css';
import Link from 'next/link';  // Import from next/link
import { useRouter } from 'next/router';

function UserDropdown({ setCurrentUser }) {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const router = useRouter();

    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('/api/user/data', {  // Ensure the endpoint is correct
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setCurrentUser(data);
                    setUsername(data.username);
                } else {
                    console.error('Failed to fetch user data:', response.status);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);  // Update the state to trigger a re-render
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
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default UserDropdown;
