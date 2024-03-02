"use client"
import React, { useState, useEffect } from 'react';
import getRandomItems from '../components/listGeneration.js';
import DataDropdown from '../components/dataDropdown';
import TransparentModal from '../components/TransparentModal';
import Data from '../Data/data.json';
import Data2 from '../Data/hannafordData.json';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

import { useAuth } from '../context/AuthContext';
function Generate() {
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
    const [weeklyPlan, setWeeklyPlan] = useState([]);
    function distributeMealsWeekly(items) {
        // Calculate total calories of all items
        const totalCalories = items.reduce((acc, item) => acc + (item.caloriesPS * item.numServings * item.count), 0);
        const targetDailyCalories = totalCalories / 7;
      
        let days = Array(7).fill(null).map(() => ({ meals: [], totalCalories: 0 }));
      
        // Sort items by total calories in descending order
        const sortedItems = items.sort((a, b) => (b.caloriesPS * b.numServings * b.count) - (a.caloriesPS * a.numServings * a.count));
      
        sortedItems.forEach(item => {
            // Find the day with the lowest current total calorie count
            let day = days.reduce((prev, current) => (prev.totalCalories < current.totalCalories) ? prev : current);
            day.meals.push(item);
            day.totalCalories += (item.caloriesPS * item.numServings * item.count);
        });
      
        // Convert the meals array into breakfast, lunch, dinner format if needed
        days = days.map(day => {
            return {
                breakfast: day.meals[0] || null,
                lunch: day.meals[1] || null,
                dinner: day.meals[2] || null,
                totalCalories: day.totalCalories
            };
        });
      
        return days;
    }
    
    
    const handleDataSelection = (dataName) => {
        if (dataName === 'data1') {
            setSelectedData(Data);
        } else if (dataName === 'data2') {
            setSelectedData(Data2);
        }
    };
    const [isLoading, setIsLoading] = useState(true); // State to control the loading state

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false); // Set loading to false after 500 milliseconds
      }, 100);
  
      return () => clearTimeout(timer); // Cleanup the timer
    }, []);
    const LoadingComponent = () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center primary-bg">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
    if (isLoading) {
      return <LoadingComponent />;
    }
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
            if (currentUser && currentUser.caloricGoal) {
                // existing code...
                setIsGenerated(true);
                setWeeklyPlan(distributeMealsWeekly(itemObjects)); // Update the weekly plan
            }
        } else {
            alert('Please log in to generate items based on your nutritional goals.');
        }
    };

    const totalCalories = randomItems.reduce((acc, item) => acc + (item.caloriesPS * item.numServings * item.count), 0);
    const totalProtein = randomItems.reduce((acc, item) => acc + (item.ProteinPS * item.numServings * item.count), 0);
    const totalCarbs = randomItems.reduce((acc, item) => acc + (item.CarbPS * item.numServings * item.count), 0);
    const totalFats = randomItems.reduce((acc, item) => acc + (item.FatPS * item.numServings * item.count), 0);

    return (
        <div className = "flex flex-col min-h-screen">
            <Navbar></Navbar>
            <div  className= {isGenerated ?"primary-bg  m-5 p-5 rounded-lg shadow-md flex-grow" : "bg-white flex-grow m-5 p-5 rounded-lg"}>


                <div className="flex flex-col sm:flex-row items-center secondary-bg p-5 rounded-lg shadow-md space-y-4 sm:space-y-0">

                    <div className="flex flex-col items-center space-x-1">
                        <label htmlFor="groceryStore" className="text-lg font-medium text-gray-700">Grocery Store:</label>
                        <div className="relative">
                            <DataDropdown onSelectData={handleDataSelection} className="block w-full px-2 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 z-1" />
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                {/* Icon or similar here */}
                            </div>
                        </div>
                    </div>

                    {isGenerated && (
                        <div className="flex-grow flex flex-col justify-center items-center p-0">
                            <p className="font-bold text-lg">Daily Average:</p>
                            <div className="flex flex-row space-x-4 ">
                                <p className="total-item"><strong>Calories:</strong> <br />{Math.floor((totalCalories / 7))}</p>
                                <p className="total-item"><strong>Protein:</strong> <br />{Math.floor((totalProtein / 7))}g</p>
                                <p className="total-item"><strong>Carbs:</strong> <br />{Math.floor((totalCarbs / 7))}g</p>
                                <p className="total-item"><strong>Fats:</strong> <br />{Math.floor((totalFats / 7))}g</p>
                            </div>
                        </div>
                    )}

                    <button className="text-xl bg-slate-200 hover:bg-slate-300 text-black font-bold py-2 px-4 rounded mr-2 ml-0 sm:ml-auto" onClick={handleGenerate}>Generate</button>
                </div>

                {/* {!isGenerated && (
                        <div className="text-center text-5xl mt-96 ">
                            <h2>Click Generate To Begin</h2>
                        </div>
                    )} */}

                <div className="flex flex-wrap justify-center mt-5 overflow-auto max-h-96 primary-bg ">
                    {randomItems.map(item => (
                        <div 
                            className="secondary-bg p-4 m-2 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 
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
            {isGenerated && (
                <div className = 'primary-bg mx-4 mb-4 rounded-lg shadow-lg'>
                    <div className="mt-10 mb-10 max-w-full mx-4">
                        <h2 className="text-center font-medium text-4xl mb-10 text-white ">Weekly Meal Plan</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-4">
                            {weeklyPlan.map((day, index) => (
                                <div key={index} className="border rounded-lg p-4 shadow-lg secondary-bg team-member">
                                    <h3 className="font-semibold text-lg mb-3">
                                        Day {index + 1} - {day.totalCalories.toFixed(0)} Calories
                                    </h3>
                                    <div>
                                        <p><strong>Breakfast:</strong> {day.breakfast ? day.breakfast.name : 'N/A'}</p>
                                        <p><strong>Lunch:</strong> {day.lunch ? day.lunch.name : 'N/A'}</p>
                                        <p><strong>Dinner:</strong> {day.dinner ? day.dinner.name : 'N/A'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}


            <div className = "mb-0">
                <Footer></Footer>
            </div>
        </div>
    );
}

export default Generate;
