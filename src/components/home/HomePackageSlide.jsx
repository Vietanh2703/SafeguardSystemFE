import React from 'react';
import ScrollDownButton from './ScrollDownButton';
import '../com-designs/HomePackageSlide.css';

const HomePackageSlide = () => {
    return (
        <section className="slide" id="packages">
            <h2>Our Packages</h2>
            <p>Choose from a variety of packages to suit your needs.</p>
            <ScrollDownButton target="reviews" />
        </section>
    );
};

export default HomePackageSlide;