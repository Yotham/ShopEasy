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
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
    const [isRegModalOpen, setRegModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        setCurrentUser(storedUser);
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
