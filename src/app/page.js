// src/HomePage.js
"use client"
import RegistrationForm from './components/RegistrationForm.js';
import Modal from './components/Modal';
import React, { useState, useEffect} from 'react';
import { useAuth } from './context/AuthContext.js';
import { useMediaQuery } from 'react-responsive'
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import LoginForm from './components/LoginForm.js'
import { TypewriterEffect } from './components/typewriter-effect.tsx';
import image from "../../public/img/kitchen.png"
import Slideshow from './components/Slideshow.js'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

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
  
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    
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
                <Navbar />
                <div className="relative flex min-h-1/2 flex-col items-center justify-center h-[30rem] shadow-xl ">
                    {/* Optional: Removed the inline comment for cleanliness */}
                    <img className="absolute w-full h-[40rem] inset-0 object-cover bg-center object-middle shadow-xl" src={image.src}></img>
                    <div className="absolute inset-0  h-[40rem] bg-black bg-opacity-55 shadow-xl"></div> {/* Dark overlay */}
                    <div className="relative z-10 items-center"> {/* Ensure content is above the overlay */}
                        <TypewriterEffect words={words} />
                        { isMobile &&
                            <p className="text-white mt-4 md:text-2xl mx-auto w-2/3 text-center font-thin">
                                We leverage advanced algorithms and a robust database of foods and ingredients from your local stores to help you meet your fitness goals.
                            </p>
                        }
                        <div className="flex flex-col items-center justify-center md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
                            <button
                                className={classNames(
                                    "group inline-block overflow-hidden rounded-sm px-12 py-3 text-sm font-medium text-[#92BCEA] bg-white focus:outline-none focus:ring",
                                    isLoginModalOpen || isRegModalOpen ? "" : "relative"
                                )}
                                onClick={() => setLoginModalOpen(true)}
                            >
                                <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-[#92BCEA] transition-all duration-200 group-hover:w-full"></span>
                                <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-[#92BCEA] transition-all duration-200 group-hover:h-full"></span>
                                <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-[#92BCEA] transition-all duration-200 group-hover:w-full"></span>
                                <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-[#92BCEA] transition-all duration-200 group-hover:h-full"></span>
                                Login
                            </button>
                            <button
                                onClick={() => setRegModalOpen(true)}
                                className={classNames(
                                    "group inline-block overflow-hidden rounded-sm px-12 py-3 text-sm font-medium text-white backdrop-blur-sm focus:outline-none focus:ring",
                                    isLoginModalOpen || isRegModalOpen ? "" : "relative"
                                )}
                            >
                                <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-[#92BCEA] transition-all duration-200 group-hover:w-full"></span>
                                <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-[#92BCEA] transition-all duration-200 group-hover:h-full"></span>
                                <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-[#92BCEA] transition-all duration-200 group-hover:w-full"></span>
                                <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-[#92BCEA] transition-all duration-200 group-hover:h-full"></span>
                                Get Started&nbsp;
                                <span aria-hidden="true">→</span>
                            </button>
                        </div>
                        { !isMobile &&
                            <p className="text-white mt-10 text-2xl mx-auto w-2/3 text-center font-thin">
                                We leverage advanced algorithms and a robust database of foods and ingredients from your local stores to help you meet your fitness goals.
                            </p>
                        }
                    </div>
                </div>
                <Modal isOpen={isRegModalOpen} onClose={() => setRegModalOpen(false)} title="Register">
                        <RegistrationForm setRegModalOpen={setRegModalOpen} />
                    </Modal>
                    <Modal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} title="Login">
                        <LoginForm setLoginModalOpen={setLoginModalOpen} />
                </Modal>

                <div className="primary-bg mt-40  text-white font-medium py-14">
                    <h2 className="text-center text-3xl sm:text-4xl xl:text-5xl font-medium">Meet The Team</h2>
                    <div className="mt-4 sm:mt-8 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-2 mx-auto max-w-5xl px-4 font-medium">
                        {/* Card 1 */}
                        <div className="team-member flex flex-col items-center primary-text">
                            <img src="/img/kyle.jpg" alt="Member 1" className="w-40 object-cover mt-6 border-4 rounded-t-xl" />
                            <p className="mb-4 bg-gray-200 pb-2 mt-0 w-40 text-center border-t-2 rounded-b-xl ">Kyle Walker</p>
                        </div>

                        {/* Card 2 */}
                        <div className="team-member flex flex-col items-center primary-text">
                            <img src="/img/ryan.jpg" alt="Member 2" className="w-40 object-cover mt-6 border-4 rounded-t-xl" />
                            <p className="mb-4  bg-gray-200 pb-2 mt-0 w-40 text-center border-t-2 rounded-b-xl">Ryan Kerr</p>
                        </div>

                        {/* Card 3 */}
                        <div className="team-member flex flex-col items-center primary-text">
                            <img src="/img/yotham.jpg" alt="Member 3" className="w-40 object-cover mt-6 border-4 rounded-t-xl" />
                            <p className="mb-4 bg-gray-200 pb-2 mt-0 w-40 text-center border-t-2 rounded-b-xl">Yotham Sage</p>
                        </div>

                        {/* Card 4 */}
                        <div className="team-member flex flex-col items-center primary-text">
                            <img src="/img/noah.jpg" alt="Member 4" className="w-40 object-cover mt-6 border-4 rounded-t-xl" />
                            <p className="mb-4 bg-gray-200 pb-2 mt-0 w-40 text-center border-t-2 rounded-b-xl">Noah Pedroso</p>
                        </div>

                        {/* Card 5 */}
                        <div className="team-member flex flex-col items-center primary-text">
                            <img src="/img/isaac.jpg" alt="Member 5" className="w-40 object-cover mt-6 border-4 rounded-t-xl" />
                            <p className="mb-4  bg-gray-200 pb-2 mt-0 w-40 text-center border-t-2 rounded-b-xl">Isaac Foster</p>
                        </div>
                    </div>
                    <p className="text-center text-xl mt-10 mx-4">Dedicated eliminating the stress of meal planning by allowing users to instantly generate meals for the week aligning with their caloric and macronutrient needs.</p>

                </div>
                <div className="secondary-bg primary-text rounded-lg mb-0">
                    <Slideshow></Slideshow>
                </div>


                <div className = "">
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}

export default Home;
