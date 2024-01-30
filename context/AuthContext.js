import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isRegModalOpen, setRegModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    const login = async (credentials) => {
        try {
            const response = await fetch('api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();
            if (response.ok) {
                Cookies.set('token', data.token, { expires: 1 }); // Set token in cookies
                setCurrentUser(data.user);
                setLoginModalOpen(false);
                alert('Logged in successfully!');
            } else {
                alert(data.message || 'Failed to login. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login.');
        }
    };

    const register = async (userRegistrationData) => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userRegistrationData)
            });

            const result = await response.json();
            if (response.status === 201) {
                alert('Registration successful!');
                if (result.token) {
                    Cookies.set('token', result.token, { expires: 1 }); // Set token in cookies
                    setCurrentUser(result.user);
                } else {
                    console.error('Token was not provided by the server.');
                    alert('Registration was successful but automatic login failed. Please log in manually.');
                }
                setRegModalOpen(false);
            } else {
                alert(result.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration. Please check your network and try again.');
        }
    };

    const handleLogout = () => {
        Cookies.remove('token'); // Remove token from cookies
        setCurrentUser(null);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const token = Cookies.get('token');
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

    const contextValue = useMemo(() => ({
        currentUser,
        setCurrentUser,
        login,
        register,
        handleLogout,
        isRegModalOpen,
        setRegModalOpen,
        isLoginModalOpen,
        setLoginModalOpen
    }), [currentUser, isRegModalOpen, isLoginModalOpen]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
