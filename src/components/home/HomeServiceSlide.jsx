import React from 'react';
import ScrollDownButton from './ScrollDownButton';
import '../com-designs/HomeServiceSlide.css';

const HomeServiceSlide = () => {
    return (
        <section className="slide" id="services">
            <h2>Our Services</h2>
            <p>We offer a wide range of services to meet your needs, including security monitoring, system installation, and 24/7 support.</p>
            <ScrollDownButton target="packages" />
        </section>
    );
};

export default HomeServiceSlide;