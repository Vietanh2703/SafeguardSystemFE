import React from 'react';
import '../com-designs/ScrollDownButtonWhite.css';

// eslint-disable-next-line react/prop-types
const ScrollDownButtonWhite = ({ target }) => {
    const handleClick = () => {
        document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
        document.querySelector('.home-navbar').classList.add('scrolled');
    };

    return (
        <div className="scroll-down-button-white" onClick={handleClick}>
            <span>Scroll Down</span>
            <div className="icon">v</div>
        </div>
    );
};

export default ScrollDownButtonWhite;