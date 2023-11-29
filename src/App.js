// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import HomePage from './HomePage';
import AccountSettings from './AccountSettings';
import GenerateScreen from './components/GenerateScreen'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FAQ from './components/FAQ';

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isRegModalOpen, setRegModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    useEffect(() => {

        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch('http://localhost:5000/user/data', {
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
        <Router>
            <div className="App">
                <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} setLoginModalOpen={setLoginModalOpen} setRegModalOpen={setRegModalOpen} />
                {currentUser ? (                
                <Routes>
                    <Route path="/generate" element={<GenerateScreen currentUser={currentUser} 
                        updateCurrentUser={setCurrentUser}
                        isRegModalOpen={isRegModalOpen}
                        setRegModalOpen={setRegModalOpen}
                        isLoginModalOpen={isLoginModalOpen}
                        setLoginModalOpen={setLoginModalOpen}
                    />} />
                    {currentUser &&<Route path="/generate" element={<GenerateScreen currentUser={currentUser} />} />} {/* New route for generate screen */}
                    {currentUser && <Route path="/account-settings" element={<AccountSettings />} />}
                    <Route path="/faq" element={<FAQ />} />
                    </Routes>) : 
                    (<Routes>
                    <Route path="/" element={<HomePage 
                        updateCurrentUser={setCurrentUser}
                        isRegModalOpen={isRegModalOpen}
                        setRegModalOpen={setRegModalOpen}
                        isLoginModalOpen={isLoginModalOpen}
                        setLoginModalOpen={setLoginModalOpen}
                    />} />
                    {currentUser &&<Route path="/generate" element={<GenerateScreen currentUser={currentUser} />} />} {/* New route for generate screen */}
                    {currentUser && <Route path="/account-settings" element={<AccountSettings />} />}
                    <Route path="/faq" element={<FAQ />} />
                </Routes>
                )}
                <Footer></Footer>
            </div>
        </Router>
    );
}

export default App;
