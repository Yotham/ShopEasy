// src/HomePage.js

import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Modal from './components/Modal';
import './components/Generation.css';



function HomePage({ updateCurrentUser, isRegModalOpen, setRegModalOpen, isLoginModalOpen, setLoginModalOpen }) {    
    return (
        <div className = "main-div">
            <div className="homepage-container">                
                <h1>Welcome to ShopEasy!</h1>
                <p className="welcome-text">
                    Explore our unique features and find the best items tailored to your nutritional goals.
                    Sign up now to get started!
                </p>

                <div className="button-container">
                    <button className="register-button" onClick={() => setRegModalOpen(true)}>Register</button>
                    <button className="login-button" onClick={() => setLoginModalOpen(true)}>Login</button>
                </div>

                <Modal isOpen={isRegModalOpen} onClose={() => setRegModalOpen(false)} title="Register">
                    <RegistrationForm setRegModalOpen={setRegModalOpen} />
                </Modal>
                <Modal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} title="Login">
                    <LoginForm setLoginModalOpen={setLoginModalOpen} />
                </Modal>
            </div>    
        </div>
    );
}

export default HomePage;
