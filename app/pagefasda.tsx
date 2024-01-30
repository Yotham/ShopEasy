// src/App.js
"use client"
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function Home() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isRegModalOpen, setRegModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
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
        <div className="App">
            <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} setLoginModalOpen={setLoginModalOpen} setRegModalOpen={setRegModalOpen} />
            <homepage />
            {/* Content will be rendered based on the route */}
            <Footer />
        </div>
    );

}

export default Home;
