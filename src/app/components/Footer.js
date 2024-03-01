import React from 'react';
import './Footer.css';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa'; // Importing GitHub icon from React Icons

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="flex flex-row space-x-4 mx-auto justify-center primary-bg text-white text-center text-xl border-t-4 border-white p-10">
            <p>© ShopEasy {currentYear}</p>
            <div className="flex justify-center space-x-4 items-center">
                <a href="https://github.com/Yotham/ShopEasy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                    <FaGithub size={24}/> {/* Using the GitHub icon here */}
                </a>
                {/* Commenting out the FAQ link for now */}
                {/* <Link href="/faq">
                    <a className="hover:text-gray-400">FAQ</a>
                </Link> */}
            </div>
        </div>
    );
}

export default Footer;
