// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import HomePage from './HomePage';
import AccountSettings from './AccountSettings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import FAQ from './components/FAQ'

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isRegModalOpen, setRegModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    useEffect(() => {
        // Replace with your server's URL
        const serverUrl = "http://localhost:5000";

        // Fetch current user data from the server
        const fetchCurrentUser = async () => {
            try {
                const username = sessionStorage.getItem('username'); // Use sessionStorage or localStorage as per your need
                if (username) {
                    const response = await fetch(`${serverUrl}/user/${username}`);
                    const data = await response.json();
                    if (response.ok) {
                        setCurrentUser(data);
                    } else {
                        console.error(data.message);
                    }
                }
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        fetchCurrentUser();
    }, []);

    return (
        <Router>
            <div className="App">
                <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} setLoginModalOpen={setLoginModalOpen} setRegModalOpen={setRegModalOpen} />
                <Routes>
                    <Route path="/" element={<HomePage 
                        updateCurrentUser={setCurrentUser}
                        isRegModalOpen={isRegModalOpen}
                        setRegModalOpen={setRegModalOpen}
                        isLoginModalOpen={isLoginModalOpen}
                        setLoginModalOpen={setLoginModalOpen}
                    />} />
                    {currentUser && <Route path="/account-settings" element={<AccountSettings />} />}
                    <Route path="/faq" element={<FAQ />} />
                </Routes>
                <Footer></Footer>
            </div>
        </Router>
    );
}

export default App;
