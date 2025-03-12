import { useState, useEffect } from 'react';
import { FaBell, FaSun, FaMoon, FaSearch } from 'react-icons/fa';
import './com-designs/NavBar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = ({ isDarkMode, toggleDarkMode, activeMenuLabel }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const [userAvatar, setUserAvatar] = useState('');

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
        sessionStorage.clear();
        window.location.href = '/';
    };

    const navigate = useNavigate();

    const handleUserSettingsClick = () => {
        navigate(`/user/${localStorage.getItem("userId")}`);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const token = localStorage.getItem("accessToken");

                if (userId && token) {
                    const response = await axios.get(`https://localhost:7217/get-user-details/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUserAvatar(response.data.avatar);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

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
                            <img src={userAvatar} alt="User Avatar" className="avatar" />
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