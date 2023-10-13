// src/HomePage.js

import React, {useState, useEffect} from 'react';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Modal from './components/Modal';
import getRandomItems from './components/listGeneration';
import DataDropdown from './components/dataDropdown';

import Data from './Data/data.json';
import Data2 from './Data/hannafordData.json';
import './components/Generation.css';
import TransparentModal from './components/TransparentModal';

function HomePage({ updateCurrentUser, isRegModalOpen, setRegModalOpen, isLoginModalOpen, setLoginModalOpen }) {
    const [randomItems, setRandomItems] = useState([]);
    const [isItemModalOpen, setItemModalOpen] = useState(false);
    const [currentItemLink, setCurrentItemLink] = useState("");
    const [currentSS, setCurrentSS] = useState("");
    const [selectedData, setSelectedData] = useState(Data);
    const [caloricGoal, setCaloricGoal] = useState(null);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log("CurrentUser from localStorage: ", currentUser);  // Debug line
        if (currentUser && currentUser.caloricGoal) {
            setCaloricGoal(Number(currentUser.caloricGoal));
        }
    }, []);

    const handleDataSelection = (dataName) => {
        if (dataName === 'data1') {
          setSelectedData(Data);
        } else if (dataName === 'data2') {
          setSelectedData(Data2);
        }
      };
      const handleGenerate = () => {
        console.log("Generating items...");  // Debug line
        if (caloricGoal) {
            console.log("Caloric Goal: ", caloricGoal);  // Debug line
            const items = getRandomItems(selectedData, caloricGoal);
            console.log("Generated items: ", items);  // Debug line
            const itemObjects = items.map(item => {
                const productData = selectedData[item.pageNumber][item.name];
                return {
                    name: item.name,
                    link: productData.link,
                    servingSize: productData.Nutrition["servingSize"]
                };
            });
            console.log("Item objects: ", itemObjects);  // Debug line
            setRandomItems(itemObjects);
        } else {
            alert('Please log in to generate items based on your nutritional goals.');
        }
    };
    
    
    return (
        <div className = "main-div">
            <center><h1>Welcome</h1></center>
            <center><DataDropdown onSelectData={handleDataSelection} /></center>
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
