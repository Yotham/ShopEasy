import React from 'react';
import './Footer.css';
import Link from 'next/link';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="footer">
            <p>© ShopEasy {currentYear}</p>
            <a href="https://github.com/Yotham/ShopEasy" target="_blank" rel="noopener noreferrer">GitHub</a> |
            <Link href="/faq">FAQ</Link> {/* Use Link for internal navigation */}
        </div>
    );
}

export default Footer;
