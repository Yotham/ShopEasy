import React, { useState, useEffect } from 'react';
import '../app/App.css'; // adjust the path to your CSS file
import Navbar from '../app/components/Navbar';

import Footer from '../app/components/Footer';
function App({ Component, pageProps }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isRegModalOpen, setRegModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    return (
        <div className="App">
            <Navbar             
            
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            isRegModalOpen={isRegModalOpen}
            setRegModalOpen={setRegModalOpen}
            isLoginModalOpen={isLoginModalOpen}
            setLoginModalOpen={setLoginModalOpen}/>
            <Component {...pageProps} />
            
            <Footer />
        </div>
    );
}

export default App;
