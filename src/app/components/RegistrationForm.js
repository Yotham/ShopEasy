import React, { useState, useRef, useEffect } from 'react';
// Import Tailwind CSS file if needed - assuming global import in your project
import { useAuth } from '../context/AuthContext';

function RegistrationForm({ setRegModalOpen }) {
    const { register } = useAuth();
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        height: [5, 0], // Default height set to 5'0"
        weight: '',
        gender: 'Male',
        goal: 'Maintain Weight',
        age: ''
    });
    const modalRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleHeightChange = (type, value) => {
        const height = [...userData.height];
        if (type === "feet") height[0] = parseInt(value, 10);
        else height[1] = parseInt(value, 10);
        setUserData(prevState => ({ ...prevState, height }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Conversions
        const heightInCm = ((userData.height[0] *12) + userData.height[1])* 2.54;
        const weightInKg = userData.weight * 0.453592;
        
        // BMR Calculation using userData.age
        let bmr;
        if (userData.gender === "Male") {
            bmr = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * userData.age);
        } else if (userData.gender === "Female") {
            bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * userData.age);
        } else {  // For "Other" gender
            const bmrMale = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * userData.age);
            const bmrFemale = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * userData.age);
            bmr = (bmrMale + bmrFemale) / 2;
        }
    
        // Caloric Goal Calculation
        let caloricGoal;
        if (userData.goal === "Lose Weight") {
            caloricGoal = bmr - 500; // Subtract 500 calories for weight loss
        } else if (userData.goal === "Gain Weight") {
            caloricGoal = bmr + 500; // Add 500 calories for weight gain
        } else {
            caloricGoal = bmr; // Maintain current weight
        }
    
        // Prepare user data for registration
        const userRegistrationData = {
            username: userData.username,
            password: userData.password,
            height: heightInCm,
            weight: userData.weight,
            gender: userData.gender,
            goal: userData.goal,
            age: userData.age,
            bmr: bmr,
            caloricGoal: caloricGoal
        };

        try{
            await register(userRegistrationData);
            window.location.href = "/generate"
        }catch(error){
            console.error("Registration Error", error)
        }

    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setRegModalOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setRegModalOpen]);

    return (
        <div className="flex items-center justify-center px-4 py-4" ref={modalRef}>
            <form className="w-full max-w-md p-6 bg-white rounded shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="username" className="font-medium">Username:</label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-medium">Password:</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="age" className="font-medium">Age:</label>
                    <input
                        id="age"
                        type="number"
                        name="age"
                        value={userData.age}
                        onChange={handleChange}
                        required
                        className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="heightFeet" className="font-medium">Height (Feet):</label>
                        <input
                            id="heightFeet"
                            type="number"
                            name="heightFeet"
                            value={userData.height[0]}
                            onChange={e => handleHeightChange('feet', e.target.value)}
                            className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="heightInches" className="font-medium">Height (Inches):</label>
                        <input
                            id="heightInches"
                            type="number"
                            name="heightInches"
                            value={userData.height[1]}
                            onChange={e => handleHeightChange('inches', e.target.value)}
                            className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="weight" className="font-medium">Weight (lbs):</label>
                        <input
                            id="weight"
                            type="number"
                            name="weight"
                            value={userData.weight}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="gender" className="font-medium">Gender:</label>
                        <select
                            id="gender"
                            name="gender"
                            value={userData.gender}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="goal" className="font-medium">Goal:</label>
                    <select
                        id="goal"
                        name="goal"
                        value={userData.goal}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                    >
                        <option value="Lose Weight">Lose Weight</option>
                        <option value="Gain Weight">Gain Weight</option>
                        <option value="Maintain Weight">Maintain Weight</option>
                    </select>
                </div>

                <input
                    type="submit"
                    value="Register"
                    className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer w-full"
                />
            </form>
        </div>
    );
}

export default RegistrationForm;