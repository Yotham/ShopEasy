import React from 'react';
import './TransparentModal.css';

function TransparentModal({ isOpen, onClose, itemLink, servingSize, numServings, caloriesPS, FatPS, CarbPS, ProteinPS ,className}) {
    if (!isOpen) return null;


    return (
        <div className="transparent-modal-overlay">
            <div className={`transparent-modal ${className}`}>  {/* Applied className here */}
                <a href={itemLink} target="_blank" rel="noopener noreferrer">View Item</a>
                <p><strong>Serving Size</strong>: <span className = "servingText">{servingSize}</span></p>
                <p><strong>Number of Servings</strong>: <span className = "servingText">{Math.round(numServings * 10) / 10}</span></p>
                <p><strong>Calories Per Serving</strong>:<span className = "servingText"> {Math.round(caloriesPS * 10) / 10}</span></p>
                <p><strong>Protein Per Serving</strong>: <span className = "servingText">{Math.round(ProteinPS * 10) / 10}g</span></p>
                <p><strong>Fat Per Serving</strong>: <span className = "servingText">{Math.round(FatPS * 10) / 10}g</span></p>
                <p><strong>Carbs Per Serving</strong>: <span className = "servingText">{Math.round(CarbPS * 10) / 10}g</span></p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default TransparentModal;
