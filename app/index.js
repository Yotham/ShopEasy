import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import FAQ from './components/FAQ';
import reportWebVitals from './reportWebVitals';

// pages/index.js
import React, { useState, useEffect } from 'react';
import HomePageComponent from '../components/HomePageComponent'; // Adjust the path as necessary

function HomePage() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isRegModalOpen, setRegModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    // Your useEffect to fetch user data ...

    return (
        <HomePageComponent
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            isRegModalOpen={isRegModalOpen}
            setRegModalOpen={setRegModalOpen}
            isLoginModalOpen={isLoginModalOpen}
            setLoginModalOpen={setLoginModalOpen}
        />
    );
}

export default HomePage;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
