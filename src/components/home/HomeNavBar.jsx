import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../com-designs/HomeNavBar.css'; // Ensure you import the CSS file

const HomeNavBar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > window.innerHeight) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`home-navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="home-navbar-logo">
                <a href="/">
                    <span className="logo-text">MyGuard</span>
                </a>
            </div>
            <div className="home-navbar-search">
                <input type="text" placeholder="Search..." />
                <button className="home-search-button">
                    <FaSearch />
                </button>
            </div>
            <ul className="home-navbar-menu">
                <li><a href="#services">Services</a></li>
                <li><a href="#packages">Products</a></li>
                <li><a href="#reviews">About us</a></li>
            </ul>
            <div className="home-navbar-login">
                <a href="/login">Login</a>
            </div>
        </nav>
    );
};

export default HomeNavBar;