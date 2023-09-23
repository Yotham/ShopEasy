// src/HomePage.js

import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Modal from './components/Modal';
function HomePage({ updateCurrentUser, isRegModalOpen, setRegModalOpen, isLoginModalOpen, setLoginModalOpen }) {
    return (
        <div>
            <center><h1>Welcome</h1></center>

            <Modal isOpen={isRegModalOpen} onClose={() => setRegModalOpen(false)} title="Register">
                <RegistrationForm setRegModalOpen={setRegModalOpen} />
            </Modal>

            <Modal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} title="Login">
                <LoginForm setCurrentUser={updateCurrentUser} setLoginModalOpen={setLoginModalOpen} />
            </Modal>
        </div>
    );
}

export default HomePage;
