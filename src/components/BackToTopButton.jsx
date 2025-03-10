import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import '../components/com-designs/BackToTopButton.css';

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > document.getElementById('video').offsetHeight) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            className={`back-to-top ${isVisible ? 'visible' : ''}`}
            onClick={scrollToTop}
        >
            <FaArrowUp />
        </button>
    );
};

export default BackToTopButton;