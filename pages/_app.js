import React, { useState, useEffect } from 'react';
import '../app/App.css'; // adjust the path to your CSS file
import Navbar from '../app/components/Navbar';
import { AuthProvider } from '../context/AuthContext';

import Footer from '../app/components/Footer';
function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <div className="App">
                <Navbar/>
                <Component {...pageProps} />
                
                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;
