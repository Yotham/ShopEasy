// src/HomePage.js

import React, {useState} from 'react';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Modal from './components/Modal';
import getRandomItems from './components/listGeneration';
import Data from './Data/data.json';
import './components/Generation.css';
import TransparentModal from './components/TransparentModal';

{/*
function clearUsers() {
    localStorage.removeItem('users');
    // Additional logic if needed, e.g., update state, show notification, etc.
}*/}
function HomePage({ updateCurrentUser, isRegModalOpen, setRegModalOpen, isLoginModalOpen, setLoginModalOpen }) {
    const [randomItems, setRandomItems] = useState([]);
    const [isItemModalOpen, setItemModalOpen] = useState(false);
    const [currentItemLink, setCurrentItemLink] = useState("");
    const [currentSS, setCurrentSS] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const handleItemClick = (name) => {
        setSelectedItem(name);
        setItemModalOpen(true);
    };
    const handleGenerate = () => {
        const items = getRandomItems(Data); 
        const itemObjects = items.map(item => {
            const productData = Data[item.pageNumber][item.name];
            return {
                name: item.name,
                link: productData.link,
                servingSize: productData.Nutrition["servingSize"]
            };
        });
    
        setRandomItems(itemObjects);
    };
    
    
    return (
        <div className = "main-div">
            <center><h1>Welcome</h1></center>
            {/*<button onClick={clearUsers}>Clear Users</button>*/}
            <center><button className = "Generate" onClick={handleGenerate}>Generate</button></center>
            
            <div className="itemBoxContainer">
                {randomItems.map(item => (
                    <div 
                        className="itemBox" 
                        key={item.name} 
                        onClick={() => {
                            setCurrentItemLink(item.link);
                            setCurrentSS(item.servingSize)
                            setItemModalOpen(true);
                        }}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
            <TransparentModal 
                isOpen={isItemModalOpen} 
                onClose={() => setItemModalOpen(false)}
                itemLink={currentItemLink}
                servingSize={currentSS}
            />
            {/* Display the random items */}
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
