import React from 'react';
import { FaMapMarkerAlt, FaUsers, FaClock } from 'react-icons/fa';
import '../com-designs/BusinessSideBar.css';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const BusinessSideBar = ({ isSidebarOpen, setActiveMenu, activeMenu }) => {
    const menuItems = [
        { id: 'checkpoint', label: <Link to={"checkpoint"}>Checkpoint</Link>, icon: FaMapMarkerAlt },
        { id: 'team', label: <Link to={"team"}>View Team</Link>, icon: FaUsers },
        { id: 'shifts', label: <Link to={"shifts"}>View Shifts</Link>, icon: FaClock }
    ];

    return (
        <aside className={`sidebar ${isSidebarOpen ? "w-64" : "w-20"}`}>
            <div className="sidebar-header">

            </div>
            <nav className="sidebar-nav">
                <div className="sidebar-section">
                    <h2 className="sidebar-section-title">Business</h2>
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveMenu(item.id)}
                            className={`flex items-center ${activeMenu === item.id ? "active" : ""}`}
                            aria-label={item.label}
                        >
                            <item.icon className="icon" />
                            {isSidebarOpen && <span>{item.label}</span>}
                        </button>
                    ))}
                </div>
            </nav>
        </aside>
    );
};

export default BusinessSideBar;