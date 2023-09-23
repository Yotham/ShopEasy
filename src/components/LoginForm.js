import React, { useState, useRef, useEffect } from 'react';
import './LoginForm.css';

function LoginForm({ setCurrentUser, setLoginModalOpen }) {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const modalRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(user => user.username === credentials.username && user.password === credentials.password);
        
        if (!user) {
            alert('Invalid credentials!');
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
        setLoginModalOpen(false);
        alert('Logged in successfully!');
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setLoginModalOpen(false);  // Close the modal if click is outside
            }
        }

        // Add the event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup the event listener on component unmount
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
