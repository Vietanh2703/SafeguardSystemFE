import { useState } from 'react';
import { FaBell, FaSun, FaMoon, FaSearch } from 'react-icons/fa';
import './com-designs/NavBar.css';
import {useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const NavBar = ({ isDarkMode, toggleDarkMode, activeMenuLabel }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    };

    const handleLogoutClick = () => {
        setShowLogoutPopup(true);
    };

    const closeLogoutPopup = () => {
        setShowLogoutPopup(false);
    };

    const confirmLogout = () => {
        // Clear session storage
        sessionStorage.clear();

        // Redirect to the login page
        window.location.href = '/login';
    };

    const navigate = useNavigate();

    const handleUserSettingsClick = () => {
        navigate(`/profile/${localStorage.getItem("userId")}`);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <h1 className="navbar-title">{activeMenuLabel}</h1>
                </div>
                <div className="navbar-right">
                    {searchOpen && (
                        <input type="text" className="search-bar" placeholder="Search..." />
                    )}
                    <button className="icon-button" onClick={toggleSearch}>
                        <FaSearch />
                    </button>
                    <button className="icon-button">
                        <FaBell />
                    </button>
                    <button className="icon-button" onClick={toggleDarkMode}>
                        {isDarkMode ? <FaSun /> : <FaMoon />}
                    </button>
                    <div className="avatar-dropdown">
                        <button className="icon-button" onClick={toggleDropdown}>
                            <img src="/path/to/avatar.jpg" alt="User Avatar" className="avatar" />
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <button className="dropdowns-item" onClick={handleUserSettingsClick}>User Settings</button>
                                <button className="dropdown-item" onClick={handleLogoutClick}>Log Out</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            {showLogoutPopup && (
                <div className="logout-popup-overlay">
                    <div className="logout-popup">
                        <p>Are you sure you want to log out?</p>
                        <button onClick={confirmLogout}>Yes</button>
                        <button onClick={closeLogoutPopup}>No</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default NavBar;