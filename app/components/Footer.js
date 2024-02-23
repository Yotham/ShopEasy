import React from 'react';
import './Footer.css';
import Link from 'next/link';


function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="bg-gray-800 text-white text-center p-4 mt-8">
            <p>© ShopEasy {currentYear}</p>
            <div className="flex justify-center space-x-2">
                <a href="https://github.com/Yotham/ShopEasy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">GitHub</a>
                <span>|</span>
                <Link className="hover:text-gray-400" href="/faq">
                    FAQ
                </Link>
            </div>
        </div>
    );
}

export default Footer;
