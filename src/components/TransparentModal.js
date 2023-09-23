import React from 'react';
import './TransparentModal.css';

function TransparentModal({ isOpen, onClose, itemLink,servingSize}) {
    if (!isOpen) return null;

    return (
        <div className="transparent-modal-overlay">
            <div className="transparent-modal">
                <a href={itemLink} target="_blank" rel="noopener noreferrer">View Item</a>
                <p>Serving Size: {servingSize}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default TransparentModal;
