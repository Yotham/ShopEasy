import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ip = 'https://shop-easy-flax.vercel.app'
// Put ip and port here for local testing aka 'http://[IP]:[PORT]'
// Otherwise put 'https://shop-easy-flax.vercel.app'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRegModalOpen, setRegModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    useEffect(() => {
        // Check the authentication status when the app starts
        const checkLoginStatus = async () => {
            setIsLoading(true);
            try {
                const userToken = await AsyncStorage.getItem('token');
                // Assuming you have a way to validate the token or get user data
                if (userToken) {
                    // Set currentUser based on the token
                    setCurrentUser({ /* User data */ });
                }
            } catch (error) {
                console.error("Failed to fetch token:", error);
            }
            setIsLoading(false);
        };

        checkLoginStatus();
    }, []);

    // Include login, logout, and register functions here
    // Make sure to set `isLoading` appropriately within these functions

    const login = async (credentials) => {
        setIsLoading(true);
        try {
            const response = await fetch(ip + '/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });
    
            const data = await response.json();
            console.log('Response data:', data);
    
            if (response.ok) {
                await AsyncStorage.setItem('token', data.token); // Save token
                setCurrentUser(data.user);
                setLoginModalOpen(false); // Assuming you're managing a modal's visibility
                setIsLoading(false);
                return { success: true };
            } else {
                // Return success as false and include the server's error message if available
                setIsLoading(false);
                return { success: false, message: data.message || 'Failed to login. Please try again.' };
            }
        } catch (error) {
            console.error('Login error:', error);
            // Return success as false and a generic error message
            setIsLoading(false);
            return { success: false, message: 'An error occurred during login.' };
        }
    };

    const register = async(userRegistrationData) =>{
        setIsLoading(true);
        // Send user registration data to server
        try {
            const response = await fetch(ip + '/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userRegistrationData), // userRegistrationData is prepared earlier in your code
            });
    
            const result = await response.json();
            if (response.status === 201) {
                alert('Registration successful!');
                console.log(result)
    
                // Store the token in local storage if it's included in the response
                if (result.token) {
                    await AsyncStorage.setItem('token', result.token); // Save token
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
        setIsLoading(false);
    }

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await AsyncStorage.removeItem('token');
            setCurrentUser(null);
        } catch (error) {
            console.error("Error during logout:", error);
            // Handle any cleanup or state reset here
        }
        //setIsLoading(false);
    }
    
    useEffect(() => {
        const fetchUserData = async () => {
            const token = await AsyncStorage.getItem('token'); // Retrieve token
            if (token) {
                try {
                    const response = await fetch(ip + '/api/user/data', {
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
        isLoading, // Add isLoading to the context value
        setIsLoading // Optionally add setIsLoading if you need to change it from outside
    }), [currentUser, isRegModalOpen, isLoginModalOpen, isLoading]); // Add isLoading to the dependency array
    
    
        
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};