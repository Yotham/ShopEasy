// src/HomePage.js
"use client"
import RegistrationForm from './RegistrationForm';
import Modal from './Modal';
import './Generation.css';
import React, { useState} from 'react';
import { useAuth } from '../../context/AuthContext';
import dynamic from 'next/dynamic';

const LoginForm = dynamic(
    () => import('./LoginForm'),
    { ssr: false }
);

function HomePageComponent() {    
    const {
        setLoginModalOpen, 
        setRegModalOpen,
        isRegModalOpen,     // Get these from the context
        isLoginModalOpen    // Get these from the context
    } = useAuth();
    
    return (
        <div class="bg-white h-full">
            <div class="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                <div class="mx-auto max-w-2xl text-center">
                    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome to <i>ShopEasy!</i><br />Start hitting your goals today.</h2>
                    <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">We leverage advanced algorithms and a robust database of foods and ingrdients from your local stores to help you meet your fitness goals.</p>
                    <div class="mt-10 flex items-center justify-center gap-x-6">
                    <button
                    class="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setLoginModalOpen(true)}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setRegModalOpen(true)}
                        class="group relative inline-block overflow-hidden rounded px-12 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring active:bg-blue-500 active:text-white">
                        <span class="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-blue-500 transition-all duration-200 group-hover:w-full"></span>
                        <span class="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-blue-500 transition-all duration-200 group-hover:h-full"></span>
                        <span class="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-blue-500 transition-all duration-200 group-hover:w-full"></span>
                        <span class="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-blue-500 transition-all duration-200 group-hover:h-full"></span>
                        Get Started
                        <span aria-hidden="true">→</span>
                    </button>
                    </div>
                </div>
                <Modal isOpen={isRegModalOpen} onClose={() => setRegModalOpen(false)} title="Register">
                    <RegistrationForm setRegModalOpen={setRegModalOpen} />
                </Modal>
                <Modal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} title="Login">
                    <LoginForm setLoginModalOpen={setLoginModalOpen} />
                </Modal>
            </div>
        </div>
    );
}

export default HomePageComponent;
