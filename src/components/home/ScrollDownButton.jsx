import React from 'react';
import '../com-designs/ScrollDownButton.css'; // Import the new CSS file

// eslint-disable-next-line react/prop-types
const ScrollDownButton = ({ target }) => {
    const handleClick = () => {
        document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="scroll-down-button" onClick={handleClick}>
            <span>Scroll Down</span>
            <div className="icon">v</div>
        </div>
    );
};

export default ScrollDownButton;