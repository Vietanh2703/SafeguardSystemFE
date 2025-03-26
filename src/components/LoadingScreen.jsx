// src/components/LoadingScreen.jsx
import React from 'react';
import '../components/com-designs/LoadingScreen.css';

const LoadingScreen = () => {
    return (
        <div className="loading-overlay">
            <div className="loading-spinner">
                <div className="spinner-inner"></div>
            </div>
        </div>
    );
};

export default LoadingScreen;