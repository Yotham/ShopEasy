import React, { useState, useRef, useEffect } from 'react';
import './RegistrationForm.css';
import { useNavigate } from 'react-router-dom';

function RegistrationForm({ setRegModalOpen }) {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        height: [5, 0],  // Default height set to 5'0"
        weight: '',
        gender: 'Male',
        goal: 'Maintain Weight'
    });
    const users = JSON.parse(localStorage.getItem('users')) || [];
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


    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('users', JSON.stringify([...users, userData]));
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setRegModalOpen(false);
        alert('Registered successfully!');
        navigate('/');  // Redirect to homepage or dashboard after successful registration
        window.location.reload();
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
