import React, { useState, useRef, useEffect } from 'react';
import './RegistrationForm.css';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
function RegistrationForm({ setRegModalOpen }) {
    const {register} = useAuth();
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        height: [5, 0],  // Default height set to 5'0"
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

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Conversions
        const heightInCm = (userData.height[0] * 30.48) + (userData.height[1] * 2.54);
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
            weight: weightInKg,
            gender: userData.gender,
            goal: userData.goal,
            age: userData.age,
            bmr: bmr,
            caloricGoal: caloricGoal
        };

        try{
            await register(userRegistrationData);
            router.push('/generate'); // The navigate function is from useNavigate() hook from react-router-dom
            //window.location.reload()
        }catch(error){
            console.error("Registration Error", error)
        }

    };
    

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setRegModalOpen(false);  // Close the modal if click is outside
            }
        }

        // Add the event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setRegModalOpen]);

    return (
        <div className="registration-modal" ref={modalRef}>
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                        <label>
                            Username:
                            <input
                                type="text"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Age:
                            <input
                                type="number"
                                name="age"
                                value={userData.age}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Height:
                            <input 
                                type="number" 
                                name="heightFeet"
                                value={userData.height ? userData.height[0] : ''}
                                onChange={e => handleHeightChange('feet', e.target.value)}
                                placeholder="Feet"
                            />
                            <input 
                                type="number" 
                                name="heightInches"
                                value={userData.height ? userData.height[1] : ''}
                                onChange={e => handleHeightChange('inches', e.target.value)}
                                placeholder="Inches"
                            />
                        </label>

                        <label>
                            Weight (in lbs):
                            <input
                                type="number"
                                name="weight"
                                value={userData.weight}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Gender:
                            <select name="gender" value={userData.gender} onChange={handleChange}>
                                <option value="">Select...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </label>

                        <label>
                            Goal:
                            <select name="goal" value={userData.goal} onChange={handleChange}>
                                <option value="">Select...</option>
                                <option value="Lose Weight">Lose Weight</option>
                                <option value="Gain Weight">Gain Weight</option>
                                <option value="Maintain Weight">Maintain Weight</option>
                            </select>
                        </label>

                        <input type="submit" value="Register" />
                    </form>
        </div>
    );
}

export default RegistrationForm;
