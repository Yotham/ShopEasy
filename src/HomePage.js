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
	const [currentNumServings, setCurrentNumServings] = useState("");
	const [currentCaloriesPS, setCurrentCaloriesPS] = useState("");
	const [currentFatPS, setCurrentFatPS] = useState("");
	const [currentCarbPS, setCurrentCarbPS] = useState("");
	const [currentProteinPS, setCurrentProteinPS] = useState("");
    const [selectedData, setSelectedData] = useState(Data);
    const [caloricGoal, setCaloricGoal] = useState(null);
    const [isGenerated, setIsGenerated] = useState(false); // New state variable
    const [currentUser, setCurrentUser] = useState(null); // State to hold the current user



    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('http://localhost:5000/user/data', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setCurrentUser(data);
                    setCaloricGoal(data.caloricGoal); // Assuming 'caloricGoal' is part of the user data
                } else {
                    console.error('Failed to fetch user data:', response.status);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    useEffect(() => {
        fetchUserData();
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
            setRandomItems(items);
            console.log("Generated items: ", items);  // Debug line
            const itemObjects = items.map(item => {
                const productData = selectedData[item.pageNumber][item.name];
                return {
                    name: item.name,
                    link: productData.link,
                    servingSize: productData.Nutrition["servingSize"],
                    numServings: productData.Nutrition["numServings"],
                    caloriesPS: productData.Nutrition["CaloriesPS"],
                    FatPS: productData.Nutrition["FatPS"],
                    CarbPS: productData.Nutrition["CarbPS"],
                    ProteinPS: productData.Nutrition["ProteinPS"]
                };
            });
            console.log("Item objects: ", itemObjects);  // Debug line
            setRandomItems(itemObjects);
            setIsGenerated(true);
        } else {
            alert('Please log in to generate items based on your nutritional goals.');
        }
    };
    const totalCalories = Math.round(randomItems.reduce((acc, item) => acc + (item.caloriesPS * item.numServings), 0) * 10) / 10;
    const totalProtein = Math.round(randomItems.reduce((acc, item) => acc + (item.ProteinPS * item.numServings), 0) * 10) / 10;
    const totalCarbs = Math.round(randomItems.reduce((acc, item) => acc + (item.CarbPS * item.numServings), 0) * 10) / 10;
    const totalFats = Math.round(randomItems.reduce((acc, item) => acc + (item.FatPS * item.numServings), 0) * 10) / 10;
    
    

    
    return (
        
        <div className = "main-div">
            <div className = "GroceryGenerate">
                Grocery Store: <DataDropdown onSelectData={handleDataSelection} />
                {/*<button onClick={clearUsers}>Clear Users</button>*/}
                <button className = "Generate" onClick={handleGenerate}>Generate</button>
            </div>
            
            <div className="itemBoxContainer">
                {randomItems.map(item => (
                    <div 
                        className="itemBox" 
                        key={item.name} 
                        onClick={() => {
                            setCurrentItemLink(item.link);
                            setCurrentSS(item.servingSize)
                            setCurrentNumServings(item.numServings);
                            setCurrentCaloriesPS(item.caloriesPS);
                            setCurrentFatPS(item.FatPS);
                            setCurrentCarbPS(item.CarbPS);
                            setCurrentProteinPS(item.ProteinPS)

                            setItemModalOpen(true);
                        }}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
            <TransparentModal 
                className="shared-background"
                isOpen={isItemModalOpen} 
                onClose={() => setItemModalOpen(false)}
                itemLink={currentItemLink}
                servingSize={currentSS}
                numServings={currentNumServings}
                caloriesPS={currentCaloriesPS}
                FatPS={currentFatPS}
                CarbPS={currentCarbPS}
                ProteinPS={currentProteinPS}
            />
            {isGenerated && (
                <div className="totals shared-background">
                    <p className="total-item"><strong>Total Calories:</strong> {Math.round((totalCalories/7)*10)/10}</p>
                    <p className="total-item"><strong>Total Protein:</strong> {Math.round((totalProtein/7)*10)/10}g</p>
                    <p className="total-item"><strong>Total Carbs:</strong> {Math.round((totalCarbs/7)*100)/100}g</p>
                    <p className="total-item"><strong>Total Fats:</strong> {Math.round((totalFats/7)*100)/100}g</p>
                </div>
            )}

            {/* Display the random items */}
            <Modal isOpen={isRegModalOpen} onClose={() => setRegModalOpen(false)} title="Register">
                <RegistrationForm setRegModalOpen={setRegModalOpen} setCurrentUser={setCurrentUser} />
            </Modal>
            <Modal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} title="Login">
                <LoginForm setCurrentUser={currentUser} setLoginModalOpen={setLoginModalOpen} />
            </Modal>
                        
        </div>
    );
}

export default HomePage;
