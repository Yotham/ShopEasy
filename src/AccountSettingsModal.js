import React, { useRef, useEffect, useState } from 'react';
import './AccountSettingsModal.css';

function AccountSettingsModal({ isOpen, onClose }) {
    const modalRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const initialHeight = currentUser.height || [5, 0];  // Default to 5'0" if no height set

    const [updatedUser, setUpdatedUser] = useState({
        ...currentUser,
        height: initialHeight
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleHeightChange = (type, value) => {
        const height = [...updatedUser.height];
        if (type === "feet") height[0] = parseInt(value);
        else height[1] = parseInt(value);
        setUpdatedUser(prevState => ({ ...prevState, height }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        alert('Account updated successfully!');
    };
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setStartY(e.clientY);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.clientX - startX;
        const y = e.clientY - startY;

        if (modalRef.current) {
            modalRef.current.style.transform = `translate(${x}px, ${y}px)`;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-background">
            <div 
                className="modal-content"
                ref={modalRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
            <form onSubmit={handleSubmit}>
                {/* ... existing input fields for username and password ... */}
                <label>
                    Height:
                    <input 
                        type="number" 
                        value={updatedUser.height[0]}
                        onChange={e => handleHeightChange('feet', e.target.value)}
                        placeholder="Feet"
                    />
                    <input 
                        type="number" 
                        value={updatedUser.height[1]}
                        onChange={e => handleHeightChange('inches', e.target.value)}
                        placeholder="Inches"
                    />
                </label>

                <label>
                    Weight (in lbs):
                    <input
                        type="number"
                        name="weight"
                        value={updatedUser.weight}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Gender:
                    <select name="gender" value={updatedUser.gender} onChange={handleChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </label>

                <label>
                    Goal:
                    <select name="goal" value={updatedUser.goal} onChange={handleChange}>
                        <option value="Lose Weight">Lose Weight</option>
                        <option value="Gain Weight">Gain Weight</option>
                        <option value="Maintain Weight">Maintain Weight</option>
                    </select>
                </label>

                <input type="submit" value="Update" />
            </form>
            </div>
        </div>
    );
}

export default AccountSettingsModal;
