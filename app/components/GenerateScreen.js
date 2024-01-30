import React, { useState, useEffect } from 'react';
import getRandomItems from './listGeneration';
import DataDropdown from './dataDropdown';
import TransparentModal from './TransparentModal';
import Data from '../Data/data.json';
import Data2 from '../Data/hannafordData.json';
import './Generation.css';

function GenerateScreen() {
    const [randomItems, setRandomItems] = useState([]);
    const [isItemModalOpen, setItemModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(Data);
    const [currentItemLink, setCurrentItemLink] = useState("");
    const [currentSS, setCurrentSS] = useState("");
	const [currentNumServings, setCurrentNumServings] = useState("");
	const [currentCaloriesPS, setCurrentCaloriesPS] = useState("");
	const [currentFatPS, setCurrentFatPS] = useState("");
	const [currentCarbPS, setCurrentCarbPS] = useState("");
	const [currentProteinPS, setCurrentProteinPS] = useState("");
    const [isGenerated, setIsGenerated] = useState(false); // New state variable
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {

        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch('/api/user/data', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setCurrentUser(data);
                    } else {
                        console.error('Failed to fetch user data:', response.status);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

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
        if (currentUser && currentUser.caloricGoal) {
            const items = getRandomItems(selectedData, currentUser.caloricGoal);
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
                    ProteinPS: productData.Nutrition["ProteinPS"],
                    count: item.count
                };
            });
            setRandomItems(itemObjects);
            setIsGenerated(true);
        } else {
            alert('Please log in to generate items based on your nutritional goals.');
        }
    };

    const totalCalories = randomItems.reduce((acc, item) => acc + (item.caloriesPS * item.numServings * item.count), 0);
    const totalProtein = randomItems.reduce((acc, item) => acc + (item.ProteinPS * item.numServings * item.count), 0);
    const totalCarbs = randomItems.reduce((acc, item) => acc + (item.CarbPS * item.numServings * item.count), 0);
    const totalFats = randomItems.reduce((acc, item) => acc + (item.FatPS * item.numServings * item.count), 0);

    return (
        <div className="main-div">
            <div className="GroceryGenerate">
                Grocery Store: <DataDropdown onSelectData={handleDataSelection} />
                <button className="Generate" onClick={handleGenerate}>Generate</button>
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
                        <div className="modalFront">
                            <div className="itemName">{item.name}</div>
                            <br></br>
                            <div className="itemCount">Amount: {item.count}</div>
                        </div>

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
                    <p className = "total-item"><strong>Daily:</strong></p>
                    <p className="total-item"><strong>Calories:</strong> {Math.round((totalCalories/7)*10)/10}</p>
                    <p className="total-item"><strong>Protein:</strong> {Math.round((totalProtein/7)*10)/10}g</p>
                    <p className="total-item"><strong>Carbs:</strong> {Math.round((totalCarbs/7)*100)/100}g</p>
                    <p className="total-item"><strong>Fats:</strong> {Math.round((totalFats/7)*100)/100}g</p>
                </div>
            )}

        </div>
    );
}

export default GenerateScreen;
