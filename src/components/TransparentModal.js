import React from 'react';
import './TransparentModal.css';

function TransparentModal({ isOpen, onClose, itemLink, servingSize, numServings, caloriesPS, FatPS, CarbPS, ProteinPS }) {
    if (!isOpen) return null;

    return (
        <div className="transparent-modal-overlay">
            <div className="transparent-modal">
                <a href={itemLink} target="_blank" rel="noopener noreferrer">View Item</a>
                <p>Serving Size: {servingSize}</p>
                <p>Number of Servings: {Math.round(numServings * 10) / 10}</p>
                <p>Calories Per Serving: {Math.round(caloriesPS * 10) / 10}</p>
                <p>Protein Per Serving: {Math.round(ProteinPS * 10) / 10}g</p>
                <p>Fat Per Serving: {Math.round(FatPS * 10) / 10}g</p>
                <p>Carbs Per Serving: {Math.round(CarbPS * 10) / 10}g</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default TransparentModal;
