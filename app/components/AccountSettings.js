// src/components/AccountSettings.js

import React, { useState,useEffect } from 'react';
import './AccountSettings.css';
import { useAuth } from '../../context/AuthContext';
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

    // Return early if not open or still loading
    if (isLoading) return <div>Loading...</div>;  // Or some other loading indicator


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
        console.log(currentUser)
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
       <center> <form onSubmit={handleSubmit}>
            {/* ... existing input fields for username and password ... */}
            <label>
                Age:
                <input
                    type="number"
                    name="age"
                    value={updatedUser.age}
                    onChange={handleChange}
                />
            </label>
            <label>
                Height:
                <input 
                    type="number" 
                    value={updatedUser.height[0]}
                    onChange={e => handleHeightChange('feet', e.target.value)}
                    placeholder="Feet"
                />
                <input 
                    type="number" 
                    value={updatedUser.height[1]}
                    onChange={e => handleHeightChange('inches', e.target.value)}
                    placeholder="Inches"
                />
            </label>

            <label>
                Weight (in lbs):
                <input
                    type="number"
                    name="weight"
                    value={updatedUser.weight}
                    onChange={handleChange}
                />
            </label>

            <label>
                Gender:
                <select name="gender" value={updatedUser.gender} onChange={handleChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </label>

            <label>
                Goal:
                <select name="goal" value={updatedUser.goal} onChange={handleChange}>
                    <option value="Lose Weight">Lose Weight</option>
                    <option value="Gain Weight">Gain Weight</option>
                    <option value="Maintain Weight">Maintain Weight</option>
                </select>
            </label>

            <input type="submit" value="Update" />
        </form></center>
    );
}

export default AccountSettings;
