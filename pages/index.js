import React, { useState, useEffect } from 'react';
import HomePageComponent from '../app/components/HomePageComponent'; // Adjust the path as necessary
import { useRouter } from 'next/router';
import { AuthProvider } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
function IndexPage() {
    const { 
        currentUser, 
        setLoginModalOpen, 
        setRegModalOpen,
        isRegModalOpen,     // Get these from the context
        isLoginModalOpen    // Get these from the context
    } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            router.push('/generate'); // Redirect if the user is logged in
        }
    }, [currentUser, router]);


    return (
        <AuthProvider>
            <HomePageComponent
            />
        </AuthProvider>
    );
}

export default IndexPage;
