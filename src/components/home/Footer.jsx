import React from 'react';
import '../com-designs/Footer.css'; // Import the CSS file

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-name">
                    <h3>Safeguard Assignment & Management Company</h3>
                </div>
                <div className="footer-nav">
                    <a href="#home">Home</a>
                    <a href="#services">Services</a>
                    <a href="#packages">Packages</a>
                    <a href="#reviews">Reviews</a>
                </div>
                <div className="footer-privacy">
                    <a href="#privacy">Privacy Policy</a>
                </div>
                <div className="footer-copyright">
                    <p>&copy; 2025 MyGuard. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;