import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import * as SecureStore from 'expo-secure-store';

const ip = 'https://shop-easy-flax.vercel.app';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRegModalOpen, setRegModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

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

            if (response.ok) {
                await SecureStore.setItemAsync('token', data.token);
                setCurrentUser(data.user);
                setLoginModalOpen(false);
                return { success: true };
            } else {
                setIsLoading(false);
                return { success: false, message: data.message || 'Failed to login. Please try again.' };
            }
        } catch (error) {
            console.error('Login error:', error);
            setIsLoading(false);
            return { success: false, message: 'An error occurred during login.' };
        }
    };

    const register = async (userRegistrationData) => {
        setIsLoading(true);
        let registrationSuccess = false;

        try {
            const response = await fetch(ip + '/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userRegistrationData),
            });

            const result = await response.json();
            if (response.status === 201) {
                alert('Registration successful!');

                if (result.token) {
                    await SecureStore.setItemAsync('token', result.token);
                    setCurrentUser(result.user);
                    registrationSuccess = true;
                } else {
                    console.error('Token was not provided by the server.');
                    alert('Registration was successful but automatic login failed. Please log in manually.');
                }
            } else {
                alert(result.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration. Please check your network and try again.');
        } finally {
            setRegModalOpen(false);
            setIsLoading(false);
        }

        return registrationSuccess;
    };

    const handleLogout = async () => {
        //setIsLoading(true);
        try {
            await SecureStore.deleteItemAsync('token');
            setCurrentUser(null);
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const credentials = await SecureStore.getItemAsync('token');
                const token = credentials ? credentials.password : null;
                if (token) {
                    const response = await fetch(`${ip}/api/user/data`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setCurrentUser(data);
                    } else {
                        if (response.status === 401 || response.status === 403) {
                            await SecureStore.deleteItemAsync('token');
                            setCurrentUser(null);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        console.log("currentUser has been updated:", currentUser);
        if (currentUser == null) {
            setUserLoggedIn(false);
        } else {
            setUserLoggedIn(true);
        }
        setIsLoading(false);
    }, [currentUser]);

    useEffect(() => {
        console.log("userLoggedIn has been updated:", userLoggedIn);
    }, [userLoggedIn]);

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
        isLoading,
        userLoggedIn
    }), [currentUser, isRegModalOpen, isLoginModalOpen, isLoading, userLoggedIn]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
