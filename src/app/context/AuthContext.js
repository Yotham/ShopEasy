'use client'
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState('');
    const [isRegModalOpen, setRegModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const[logging,setLogging] = useState(false)


    const login = async(credentials) =>{
        try {
            const response = await fetch('api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                setCurrentUser(data.user);
                fetchUserData();
                setLogging(true)
                setLoginModalOpen(false);
                localStorage.setItem('token', data.token);
                await fetchUserData();
                alert("Login Successful")
            } else {
                alert(data.message || 'Failed to login. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login.');
        }
    }

    const register = async(userRegistrationData) =>{
        // Send user registration data to server
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userRegistrationData), // userRegistrationData is prepared earlier in your code
            });
            console.log(response);
            const result = await response.json();
            if (response.status === 201) {
                alert('Registration successful!');
                console.log(result)
    
                // Store the token in local storage if it's included in the response
                if (result.token) {
                    localStorage.setItem('token', result.token);
                    setCurrentUser(result.user)
                } else {
                    // Handle the case where the token is not sent back by the server
                    console.error('Token was not provided by the server.');
                    alert('Registration was successful but automatic login failed. Please log in manually.');
                }
            } else {
                // If the server responds with any status code other than 201, show the message sent by the server
                alert(result.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            // If the fetch itself fails (e.g., due to network issues), log the error and notify the user
            console.error('Error during registration:', error);
            alert('An error occurred during registration. Please check your network and try again.');
        }
    
        // Close the registration modal
        setRegModalOpen(false);
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);  // Update the state to trigger a re-render
        setLogging(false)
    }
    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('/api/user/data', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setCurrentUser(data);
                    console.log("Here",data)
                } else {
                    // If token is invalid or expired, clear it from local storage
                    if (response.status === 401 || response.status === 403) {
                        localStorage.removeItem('token');
                        setCurrentUser(null);
                    } else {
                        console.error('Failed to fetch user data:', response.status);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []); // This ensures fetchUserData runs once on component mount
    // If you want to refetch user data on login/logout, consider using a state that changes on these actions
    useEffect(() => {
        if (logging) {
            // Assuming currentUser is null or undefined when not logged in
            fetchUserData();
        }
    },[logging]); // This will trigger when currentUser changes
    // Include any auth functions you need (e.g., login, logout)

    const contextValue = useMemo(() => ({
        currentUser,
        setCurrentUser,
        login,
        handleLogout,
        isRegModalOpen,
        setRegModalOpen,
        isLoginModalOpen,
        setLoginModalOpen,
        register,
    }), [currentUser, isRegModalOpen, isLoginModalOpen]); // add other dependencies if needed

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};