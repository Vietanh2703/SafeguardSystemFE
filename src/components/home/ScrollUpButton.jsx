import React from 'react';
import '../com-designs/ScrollUpButton.css'; // Import the new CSS file

const ScrollUpButton = ({ target }) => {
    const handleClick = () => {
        document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="scroll-up-button" onClick={handleClick}>
            <span>Scroll Up</span>
            <div className="icon">^</div>
        </div>
    );
};

export default ScrollUpButton;