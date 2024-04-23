// src/HomePage.js
"use client"
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import RegistrationForm from '../components/RegistrationForm.js';
import LoginForm from '../components/LoginForm.js'
import Modal from '../components/Modal';
import React, { useState, useEffect} from 'react';
import { useAuth } from '../context/AuthContext.js';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

const faqs = [
    {
        question: "What is ShopEasy?",
        answer:
        "ShopEasy is a web application that helps users achieve their fitness goals by using their height, weight, and weight goal to generate a list of suggested groceries from the store they've selected that will fulfill their caloric and macronutrient needs.",
    },
    {
        question: "How do I use ShopEasy?",
        answer:
        "Upon creating an account, users will be directed to a \"generate\" page which has a button that will generate a list of groceries for one week of eating according to their goals.",
    },
    {
        question: "Why should I use ShopEasy?",
        answer:
        "ShopEasy removes the need for tracking calories and macros as all the meals generated will automatically meet your goals and needs.",
    },
    {
        question: "How do I contact ShopEasy?",
        answer:
        "Users can contact ShopEasy by visiting the contact page and filling out the contact form. The ShopEasy team will respond to inquiries as soon as possible.",
    }
]

function FAQ() {
    const {
        currentUser,
        isRegModalOpen,
        setRegModalOpen,
        isLoginModalOpen,
        setLoginModalOpen
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
                <Navbar />

                <div className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
                    <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                    <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
                    <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                        {faqs.map((faq) => (
                        <Disclosure as="div" key={faq.question} className="pt-6">
                            {({ open }) => (
                            <>
                                <dt>
                                <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                    <span className="text-base font-semibold leading-7">{faq.question}</span>
                                    <span className="ml-6 flex h-7 items-center">
                                    {open ? (
                                        <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                    )}
                                    </span>
                                </Disclosure.Button>
                                </dt>
                                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                                </Disclosure.Panel>
                            </>
                            )}
                        </Disclosure>
                        ))}
                    </dl>
                    </div>
                </div>
                </div>

                <Modal isOpen={isRegModalOpen} onClose={() => setRegModalOpen(false)} title="Register">
                        <RegistrationForm setRegModalOpen={setRegModalOpen} />
                    </Modal>
                    <Modal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} title="Login">
                        <LoginForm setLoginModalOpen={setLoginModalOpen} />
                </Modal>

                <div className = "mt-5 max-w-screen">
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}

export default FAQ;