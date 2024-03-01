"use client"
import React, { useState, useRef, useEffect } from 'react';
import './LoginForm.css';
import { useAuth } from '../context/AuthContext';
function LoginForm({setLoginModalOpen }) {
    const { login,setCurrentUser } = useAuth(); // Destructure login from the context
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const modalRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            console.log('Submitting credentials:', credentials);
            const redirect = await login(credentials);
            console.log(redirect)
            //window.location.href = '/generate'; // Redirect to the /generate page
        }catch(error){
            console.error('Login Failed', error)
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setLoginModalOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setLoginModalOpen]);

    return (
        <div className="login-modal" ref={modalRef}>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}

export default LoginForm;