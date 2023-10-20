import React from 'react';
import './Footer.css';  // Assuming you'll save the CSS in a file named Footer.css

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="footer">
            <p>© ShopEasy {currentYear}</p>
            <a href="https://github.com/Yotham/ShopEasy" target="_blank" rel="noopener noreferrer">GitHub</a> |
            <a href="/faq">FAQ</a>
        </div>
    );
}

export default Footer;
