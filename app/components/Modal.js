// src/components/Modal.js

import React from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay z-50">
            <div className="modal">
                <div className="modal-header">
                </div>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
