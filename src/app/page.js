// src/HomePage.js
"use client"
import RegistrationForm from './components/RegistrationForm.js';
import Modal from './components/Modal';
import React, { useState, useEffect} from 'react';
import { useAuth } from './context/AuthContext.js';
import dynamic from 'next/dynamic';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import LoginForm from './components/LoginForm.js'

function Home() {    
    const {
        currentUser,
        // setLoginModalOpen, 
        // setRegModalOpen,
        // isRegModalOpen,     // Get these from the context
        // isLoginModalOpen    // Get these from the context
    } = useAuth();
  
    
    // State for managing the loading condition
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(true); // State to control the loading state

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading2(false); // Set loading to false after 500 milliseconds
      }, 200);
  
      return () => clearTimeout(timer); // Cleanup the timer
    }, []);
    const LoadingComponent = () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
    // Redirect with loading state
    useEffect(() => {
        if (currentUser) {
            setIsLoading(true); // Set loading true before redirecting
            // Wait for a bit before redirecting to allow the loading UI to be visible
            setTimeout(() => {
                window.location.href = '/generate';
            }, 200); // Adjust the delay as needed
        }
    }, [currentUser]); // Depend on currentUser
    if (isLoading2) {
        return <LoadingComponent />;
      }
    if (isLoading) {
        // Render a loading spinner or any loading component you prefer
        return <LoadingComponent />;
    }
    if(!currentUser){
        return (
            <div>
                <Navbar></Navbar>
                <div className="flex flex-col h-dvh items-center justify-center">                
                    <h1 className = 'text-7xl font-medium py'>Welcome to ShopEasy!</h1>
                    <p className="text-3xl mt-4">
                        Explore our unique features and find the best items tailored to your nutritional goals.
                        Sign up now to get started!
                    </p>

                    {/* <div className="button-container">
                        <button className="login-button" onClick={() => setLoginModalOpen(true)}>Login</button>
                        <button className="register-button" onClick={() => setRegModalOpen(true)}>Register</button>
                    </div>

                    <Modal isOpen={isRegModalOpen} onClose={() => setRegModalOpen(false)} title="Register">
                        <RegistrationForm setRegModalOpen={setRegModalOpen} />
                    </Modal>
                    <Modal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} title="Login">
                        <LoginForm setLoginModalOpen={setLoginModalOpen} />
                    </Modal> */}
                </div>    
                <Footer></Footer>
            </div>
        );
    }
}

export default Home;
