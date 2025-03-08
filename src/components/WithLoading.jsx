// src/components/WithLoading.jsx
import React, { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

const withLoading = (WrappedComponent) => {
    return (props) => {
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 2000); // 2 seconds loading time

            return () => clearTimeout(timer);
        }, []);

        return (
            <>
                {loading && <LoadingScreen />}
                {!loading && <WrappedComponent {...props} />}
            </>
        );
    };
};

export default withLoading;