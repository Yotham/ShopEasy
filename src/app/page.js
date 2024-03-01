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
import { TypewriterEffect } from './components/typewriter-effect.tsx';
import image from "../../public/img/kitchen.png"
function Home() {    
    const words = [
        {
          text: "Meal",
        },
        {
          text: "planning",
        },
        {
          text: "made",
        },
        {
            text: "simple",
          },
        {
          text: "with",
        },
        {
          text: "ShopEasy.",
          className: "primary-text",
        },
      ];
    const {
        currentUser,
        setLoginModalOpen, 
        setRegModalOpen,
        isRegModalOpen,     // Get these from the context
        isLoginModalOpen    // Get these from the context
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
      <div className="fixed inset-0 z-50 flex items-center justify-center primary-bg">
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
                {/* <div className="flex flex-col h-dvh items-center justify-center">                
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
                    </Modal> }
                </div>     */}
                <div className="relative flex min-h-1/2 flex-col items-center justify-center h-[30rem] shadow-xl ">
                    {/* Optional: Removed the inline comment for cleanliness */}
                    <img className="absolute w-full h-[40rem] inset-0 object-cover bg-center object-middle shadow-xl" src={image.src}></img>
                    <div className="absolute inset-0  h-[40rem] bg-black bg-opacity-55 shadow-xl"></div> {/* Dark overlay */}
                    <div className="relative z-10 items-center"> {/* Ensure content is above the overlay */}
                        <TypewriterEffect words={words} />
                        <div className="flex flex-col items-center justify-center md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
                            <button className="w-40 h-12 text-xl bg-slate-200 hover:bg-slate-300 text-black font-bold py-2 px-4 rounded md:mr-2" onClick={() => setLoginModalOpen(true)}>
                            Login
                            </button>
                            <button className="w-40 h-12 text-xl bg-slate-200 hover:bg-slate-300 text-black font-bold py-2 px-4 rounded " onClick={() => setRegModalOpen(true)}>
                            Signup
                            </button>
                        </div>
                    </div>
                </div>
                <Modal isOpen={isRegModalOpen} onClose={() => setRegModalOpen(false)} title="Register">
                        <RegistrationForm setRegModalOpen={setRegModalOpen} />
                    </Modal>
                    <Modal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} title="Login">
                        <LoginForm setLoginModalOpen={setLoginModalOpen} />
                </Modal> 
                <div className="secondary-bg primary-text font-medium mt-40 py-14">
                    <h2 className="text-center text-4xl font-medium">Meet The Team</h2>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mx-auto max-w-7xl px-4 font-medium">
                        {/* Card 1 */}
                        <div className="team-member flex flex-col items-center text-white rounded-lg shadow primary-bg text shadow-xl">
                            <img src="/img/kyle.jpg" alt="Member 1" className="w-40 object-cover rounded-xl mt-6 border-4" />
                            <p className="mb-4 mt-2">Kyle Walker</p>
                        </div>

                        {/* Card 2 */}
                        <div className="team-member flex flex-col items-center text-white rounded-lg shadow primary-bg text shadow-xl">
                            <img src="/img/ryan.jpg" alt="Member 2" className="w-40 object-cover rounded-xl mt-6 border-4" />
                            <p className="mb-4 mt-2">Ryan Kerr</p>
                        </div>

                        {/* Card 3 */}
                        <div className="team-member flex flex-col items-center text-white rounded-lg shadow primary-bg text shadow-xl">
                            <img src="/img/yotham.jpg" alt="Member 3" className="w-40 object-cover rounded-xl mt-6 border-4" />
                            <p className="mb-4 mt-2">Yotham Sage</p>
                        </div>

                        {/* Card 4 */}
                        <div className="team-member flex flex-col items-center text-white rounded-lg shadow primary-bg text shadow-xl">
                            <img src="/img/noah.jpg" alt="Member 4" className="w-40 object-cover rounded-xl mt-6 border-4" />
                            <p className="mb-4 mt-2">Noah Pedroso</p>
                        </div>

                        {/* Card 5 */}
                        <div className="team-member flex flex-col items-center text-white rounded-lg shadow primary-bg text shadow-xl">
                            <img src="/img/isaac.jpg" alt="Member 5" className="w-40 object-cover rounded-xl mt-6 border-4" />
                            <p className="mb-4 mt-2">Isaac Foster</p>
                        </div>
                    </div>
                    <p className = "text-center text-xl mt-10">Dedicated eliminating the stress of meal planning by allowing user{"'"}s to instantly generate meals for the week aligning with their caloric and macronutrient needs.</p>

                </div>


                <div className = "">
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}

export default Home;
