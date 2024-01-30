import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    // Function to check the current user's authentication status
    const checkAuthStatus = async () => {
        try {
            const response = await fetch('/api/user/data', {
                method: 'GET',
                credentials: 'include', // Necessary for cookies to be sent
            });

            if (response.ok) {
                const data = await response.json();
                setCurrentUser(data.user);
            } else {
                setCurrentUser(null);
            }
        } catch (error) {
            console.error('Error fetching auth status:', error);
        }
    };

    // Log in function
    const login = async (credentials) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
                credentials: 'include', // Necessary for cookies to be sent
            });

            if (response.ok) {
                await checkAuthStatus();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error; // Rethrow to handle in the UI
        }
    };

    // Logout function
    const logout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include', // Necessary for cookies to be sent
            });

            if (response.ok) {
                setCurrentUser(null);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            console.error('Logout error:', error);
            throw error; // Rethrow to handle in the UI
        }
    };

    // Register function
    const register = async (userData) => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
                credentials: 'include', // Necessary for cookies to be sent
            });

            if (response.ok) {
                await checkAuthStatus();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            console.error('Registration error:', error);
            throw error; // Rethrow to handle in the UI
        }
    };

    // Check the user's auth status when the component mounts
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const contextValue = useMemo(() => ({
        currentUser,
        login,
        logout,
        register,
    }), [currentUser]);

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
