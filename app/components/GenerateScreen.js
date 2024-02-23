import React, { useState, useEffect } from 'react';
import getRandomItems from './listGeneration';
import DataDropdown from './dataDropdown';
import TransparentModal from './TransparentModal';
import Data from '../Data/data.json';
import Data2 from '../Data/hannafordData.json';
import './Generation.css';
import { useAuth } from '../../context/AuthContext';
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
    const { currentUser} = useAuth();
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
            <div className=" flex items-center justify-center bg-gray-100 p-2 rounded-lg shadow space-x-4">
                <label htmlFor="groceryStore" className="text-lg font-medium text-gray-700">Grocery Store:</label>
                <div className="relative flex-grow">
                    <DataDropdown onSelectData={handleDataSelection} className="block w-full px-2 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        {/* Assuming you might want to add an icon or similar here */}
                    </div>
                {isGenerated && (
                     <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-4">
                        <div className = " flex flex-col items-center justify-center space-x-4 p-0">
                            <p className="font-bold text-lg">Daily Average:</p>
                            <div className="flex flex-row space-x-4">
                                <p className="total-item"><strong>Calories:</strong> <br />{Math.round((totalCalories / 7) * 10) / 10}</p>
                                <p className="total-item"><strong>Protein:</strong> <br />{Math.round((totalProtein / 7) * 10) / 10}g</p>
                                <p className="total-item"><strong>Carbs:</strong> <br />{Math.round((totalCarbs / 7) * 100) / 100}g</p>
                                <p className="total-item"><strong>Fats:</strong> <br />{Math.round((totalFats / 7) * 100) / 100}g</p>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
                <button className="Generate px-4 py-2 bg-indigo-500 text-white font-bold rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" onClick={handleGenerate}>Generate</button>
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

        </div>
    );
}

export default GenerateScreen;
