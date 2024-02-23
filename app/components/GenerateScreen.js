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
        <div className="bg-black bg-opacity-10 m-5 p-5 rounded-lg shadow-md h-full">


            <div className=" flex items-center justify-left bg-slate-100 p-5 rounded-lg shadow-md">
                <div className = "flex flex-col items-center justify-left space-x-1">
                    <label htmlFor="groceryStore" className="text-lg font-medium text-gray-700">Grocery Store:</label>
                    <div className="relative">
                        <DataDropdown onSelectData={handleDataSelection} className="block w-full px-2 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 z-1" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            {/* Assuming you might want to add an icon or similar here */}
                        </div>
                    </div>
                </div>
                {isGenerated && (
                        <div className = "flex-grow flex flex-col justify-center items-center p-0">
                            <p className="font-bold text-lg">Daily Average:</p>
                            <div className="flex flex-row space-x-4 ">
                                <p className="total-item"><strong>Calories:</strong> <br />{Math.floor((totalCalories / 7))}</p>
                                <p className="total-item"><strong>Protein:</strong> <br />{Math.floor((totalProtein / 7))}g</p>
                                <p className="total-item"><strong>Carbs:</strong> <br />{Math.floor((totalCarbs / 7))}g</p>
                                <p className="total-item"><strong>Fats:</strong> <br />{Math.floor((totalFats / 7))}g</p>
                            </div>
                        </div>
                    )}
                <button className="ml-auto px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:outline-non " onClick={handleGenerate}>Generate</button>
            </div>


            <div className="flex flex-wrap justify-center overflow-y-auto overflow-custom mt-5"style={{ height: '70%' }}>
                {randomItems.map(item => (
                    <div 
                        className="bg-slate-100 p-4 m-2 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 
                        w-full sm:w-1/2 md:w-1/3 lg:w-1/8 xl:w-1/5"
                        key={item.name} 
                        onClick={() => {
                            setCurrentItemLink(item.link);
                            setCurrentSS(item.servingSize);
                            setCurrentNumServings(item.numServings);
                            setCurrentCaloriesPS(item.caloriesPS);
                            setCurrentFatPS(item.FatPS);
                            setCurrentCarbPS(item.CarbPS);
                            setCurrentProteinPS(item.ProteinPS);
                            setItemModalOpen(true);
                        }}
                    >
                        <div className="flex flex-col text-center items-center">
                            <div className="text-lg font-semibold text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-700 mt-2">Amount: {item.count}</div>
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
