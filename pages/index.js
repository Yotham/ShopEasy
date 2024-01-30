import React, { useState, useEffect } from 'react';
import HomePageComponent from '../app/HomePageComponent'; // Adjust the path as necessary
import { useRouter } from 'next/router';
import { AuthProvider } from '../context/AuthContext';

function IndexPage() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isRegModalOpen, setRegModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Added loading state

    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                setIsLoading(true); // Set loading true while fetching
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
                setIsLoading(false); // Set loading to false after fetching
            } else {
                setIsLoading(false); // Set loading to false if there's no token
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (currentUser) {
            router.push('/generate'); // Redirect if the user is logged in
        }
    }, [currentUser, router]);

    if (isLoading) {
        return <div></div>; // or a loading spinner
    }

    return (
        <AuthProvider>
            <HomePageComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                isRegModalOpen={isRegModalOpen}
                setRegModalOpen={setRegModalOpen}
                isLoginModalOpen={isLoginModalOpen}
                setLoginModalOpen={setLoginModalOpen}
            />
        </AuthProvider>
    );
}

export default IndexPage;
