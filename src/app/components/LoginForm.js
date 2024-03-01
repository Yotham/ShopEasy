import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function LoginForm({ setLoginModalOpen }) {
    const { login } = useAuth(); // Destructure login from the context
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
        try {
            console.log('Submitting credentials:', credentials);
            const redirect = await login(credentials);
            console.log(redirect);
            //window.location.href = '/generate'; // Redirect to the /generate page
        } catch (error) {
            console.error('Login Failed', error);
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
        <div className="login-modal z-50" ref={modalRef}>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username:
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password:
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-center"> {/* Updated class here */}
                    <input
                        type="submit"
                        value="Login"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    />
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
