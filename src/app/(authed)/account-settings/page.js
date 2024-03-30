// src/components/AccountSettings.js
"use client"
import React, { useState,useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { redirect } from 'next/navigation';

function AccountSettings() {
    const {
        currentUser
    } = useAuth();
    const [updatedUser, setUpdatedUser] = useState({
        height: [0, 0],
        weight: '',
        gender: '',
        goal: '',
        // ... add other fields as needed
    });
    const [isLoading, setIsLoading] = useState(true);

    const cmToFeetAndInches = (cm) => {
        const totalInches = cm / 2.54;
        const feet = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        return [feet, inches];

    };
    useEffect(() => {
        if (currentUser) {
            const [feet, inches] = cmToFeetAndInches(currentUser.height);
            setUpdatedUser({
                ...currentUser,
                height: [feet, inches]
            });
            setIsLoading(false);
        }
    }, [currentUser]);

    if (!currentUser) {
        redirect('/');
    }

    const LoadingComponent = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center primary-bg">
            <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    );
    // Return early if not open or still loading
    if (isLoading) return <LoadingComponent />;  // Or some other loading indicator


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleHeightChange = (type, value) => {
        const height = [...updatedUser.height];
        if (type === "feet") height[0] = parseInt(value);
        else height[1] = parseInt(value);
        setUpdatedUser(prevState => ({ ...prevState, height }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/user/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updatedUser)
            });

            if (!response.ok) {
                throw new Error('Failed to update user data');
            }

            const updatedData = await response.json();
            //setCurrentUser(updatedData);  // Update the local state to reflect the changes
            alert('Account updated successfully!');
            // Optionally, redirect the user or perform other actions
        } catch (error) {
            console.error('Error updating user data:', error);
            alert('An error occurred while updating the account.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen">
                <h2 className="text-4xl pt-12 mb-8 text-center">
                    Account Settings
                </h2>
                <form className="mx-auto max-w-3xl w-full text-xl lg:space-y-2 2xl:space-y-6 p-4 even-shadow rounded-lg" onSubmit={handleSubmit}>
                    {/* ... existing input fields for username and password ... */}
                    <div className="grid grid-cols-2 items-center p-2">
                        <label>
                            Age:
                        </label>
                        <input
                            className="border borer-gray-300 p-2 rounded-md w-full"
                            type="number"
                            name="age"
                            value={updatedUser.age}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="bg-gray-300 h-[1px] w-full" />
                    <div className="grid grid-cols-2 items-center p-2">
                        <label>
                            Height:
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                className="border borer-gray-300 p-2 rounded-md w-full"
                                type="number"
                                value={updatedUser.height[0]}
                                onChange={e => handleHeightChange('feet', e.target.value)}
                                placeholder="Feet"
                            />
                            <input
                                className="border borer-gray-300 p-2 rounded-md w-full"
                                type="number"
                                value={updatedUser.height[1]}
                                onChange={e => handleHeightChange('inches', e.target.value)}
                                placeholder="Inches"
                            />
                        </div>
                    </div>
                    <div className="bg-gray-300 h-[1px] w-full" />
                    <div className="grid grid-cols-2 items-center p-2">
                        <label>
                            Weight (in lbs):
                        </label>
                        <input
                            className="border borer-gray-300 p-2 rounded-md w-full"
                            type="number"
                            name="weight"
                            value={updatedUser.weight}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="bg-gray-300 h-[1px] w-full" />
                    <div className="grid grid-cols-2 items-center p-2">
                        <label>
                            Gender:
                        </label>
                        <select
                            className="border borer-gray-300 p-2 rounded-md w-full"
                            name="gender" value={updatedUser.gender} onChange={handleChange}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="bg-gray-300 h-[1px] w-full" />
                    <div className="grid grid-cols-2 items-center p-2">
                        <label>
                            Goal:
                        </label>
                        <select
                            className="border borer-gray-300 p-2 rounded-md w-full"
                            name="goal" value={updatedUser.goal} onChange={handleChange}
                        >
                            <option value="Lose Weight">Lose Weight</option>
                            <option value="Gain Weight">Gain Weight</option>
                            <option value="Maintain Weight">Maintain Weight</option>
                        </select>
                    </div>
                    <div className="w-full text-center p-4">
                        <button className="bg-shopeasy-blue px-8 py-2 rounded-lg text-white hover:bg-blue-200" type="submit">
                            Update
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default AccountSettings;
