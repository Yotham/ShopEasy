import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import './LoginForm.css';

function LoginForm({ setCurrentUser, setLoginModalOpen }) {
    const router = useRouter();
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
        console.log('Submitting credentials:', credentials);

        try {
            const response = await fetch('api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setLoginModalOpen(false);
                alert('Logged in successfully!');
                router.push('/generate');
            } else {
                alert(data.message || 'Failed to login. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login.');
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
