import React, { useState, useRef, useEffect } from 'react';
// Import Tailwind CSS file if needed - assuming global import in your project
import { useAuth } from '../context/AuthContext';

function RegistrationForm({ setRegModalOpen }) {
    const { register, setLoginModalOpen } = useAuth();
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        height: [5, 0], // Default height set to 5'0"
        weight: '',
        gender: 'Male',
        goal: 'Maintain Weight',
        age: '',
        budget: '',
        macros:{
            proteins: '50',
            fats: '20',
            carbs: '30'
        },
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
    
        // getting data
        const formData = new FormData(e.target);
        const username = formData.get("username");
        const password = formData.get("password");
        const age = formData.get("age");
        const heightFt = formData.get("feet");
        const heightIn = formData.get("inches");
        const weight = formData.get("weight");
        const gender = formData.get("gender")
        const goal = formData.get("goal");
        const budget = formData.get("budget");

        // Conversions
        const heightInCm = ((heightFt * 12) + heightIn)* 2.54;
        const weightInKg = formData.get("weight") * 0.453592;
        
        // BMR Calculation using userData.age
        let bmr;
        if (gender === "Male") {
            bmr = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age);
        } else if (gender === "Female") {
            bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);
        } else {  // For "Other" gender
            const bmrMale = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age);
            const bmrFemale = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);
            bmr = (bmrMale + bmrFemale) / 2;
        }
    
        // Caloric Goal Calculation
        let caloricGoal;
        if (goal === "Lose Weight") {
            caloricGoal = bmr - 500; // Subtract 500 calories for weight loss
        } else if (goal === "Gain Weight") {
            caloricGoal = bmr + 500; // Add 500 calories for weight gain
        } else {
            caloricGoal = bmr; // Maintain current weight
        }
    
        // Prepare user data for registration
        const userRegistrationData = {
            username: username,
            password: password,
            height: heightInCm,
            weight: weight,
            gender: gender,
            goal: goal,
            age: age,
            bmr: bmr,
            caloricGoal: caloricGoal,
            budget: budget,
            macros: {
                proteins: '50',
                fats: '20',
                carbs: '30'
            },
        };

        try {
            await register(userRegistrationData);
            console.log(userRegistrationData)
            router.push('/generate'); // The navigate function is from useNavigate() hook from react-router-dom
            window.location.reload()
        } catch(error){
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
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700" ref={modalRef}>
            <div className="p-6 space-y-4 max-h-screen overflow-auto md:space-y-6 sm:p-8">
                <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Register for a free account
                </h1>
                <form className="space-y-2 md:space-y-2" onSubmit={handleSubmit}>
                    <div>
                        <label for="username" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="username"
                            autoComplete='username'
                            required
                        />
                    </div>
                    <div>
                        <label for="password" className="block mt-6 mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            autoComplete='new-password'
                            required
                        />
                    </div>
                    <div>
                        <label for="confirmpassword" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmpassword"
                            id="confirmpassword"
                            placeholder="••••••••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label for="age" className="block mt-6 mb-1 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                        <input
                            type="number"
                            name="age"
                            id="age"
                            placeholder="Please enter your age"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="feet" className="block mt-6 mb-1 text-sm font-medium text-gray-900 dark:text-white">
                            Height
                        </label>
                        <div className="flex">
                            <input
                            type="number"
                            name="feet"
                            id="feet"
                            placeholder='Feet'
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            />
                            <input
                            type="number"
                            name="inches"
                            id="inches"
                            placeholder='Inches'
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            />
                        </div>
                    </div>
                    <div>
                        <label for="weight" className="block mt-6 mb-1 text-sm font-medium text-gray-900 dark:text-white">Weight</label>
                        <input
                            type="number"
                            name="weight"
                            id="weight"
                            placeholder="Please enter your weight"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <label>
                        Sex:
                    </label>
                    <select
                        name="gender"
                        // value={userData.gender}
                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        required
                    >
                        <option value="">Select...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <label>
                        Goal:
                    </label>
                    <select
                        name="goal"
                        // value={userData.gender}
                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        required
                    >
                        <option value="">Select...</option>
                        <option value="Lose Weight">Lose Weight</option>
                        <option value="Gain Weight">Gain Weight</option>
                        <option value="Maintain Weight">Maintain Weight</option>
                    </select>

                    <div>
                        <label for="weight" className="block mt-6 mb-1 text-sm font-medium text-gray-900 dark:text-white">Budget</label>
                        <input
                            type="number"
                            name="budget"
                            id="budget"
                            placeholder="Please enter your Budget $"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        {/* <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="remember"
                                    aria-describedby="remember"
                                    type="checkbox"
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                    required=""
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a> */}
                    </div>
                    <button 
                        type="submit"
                        className="w-full text-white bg-[#7AA7EB] hover:bg-[#92BCEA] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            Sign Up
                    </button>
                </form>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account? {' '}
                    <button
                        onClick={() => {
                            setRegModalOpen(false);
                            setLoginModalOpen(true);
                        }}
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                        Log in
                    </button>
                </p>
            </div>
        </div>
    );
}

export default RegistrationForm;