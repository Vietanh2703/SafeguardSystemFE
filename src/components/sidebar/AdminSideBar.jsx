import React from 'react';
import { FaTachometerAlt, FaUser, FaCalendarAlt, FaHandshake, FaFileAlt, FaFileContract, FaQuestionCircle } from 'react-icons/fa';
import '../com-designs/AdminSideBar.css'
import { LiaAdSolid } from 'react-icons/lia';
import { MdOutlineStop } from 'react-icons/md';

// eslint-disable-next-line react/prop-types
const AdminSideBar = ({ isSidebarOpen, setActiveMenu, activeMenu }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt, section: 'Dashboard' },
        { id: 'user', label: 'User', icon: FaUser, section: 'Utilities' },
        { id: 'calendar', label: 'Calendar', icon: FaCalendarAlt, section: 'Utilities' },
        { id: 'business-partner', label: 'Business Partner', icon: FaHandshake, section: 'Utilities' },
        { id: 'location', label: 'Business location', icon: MdOutlineStop, section: 'Utilities' },
        { id: 'report', label: 'Report', icon: FaFileAlt, section: 'Utilities' },
        { id: 'contract', label: 'Contract', icon: FaFileContract, section: 'Utilities' },
    ];

    return (
        <aside className={`sidebar ${isSidebarOpen ? "w-64" : "w-20"}`}>
            <div className="sidebar-header">
                {/* Add your logo or title here */}
            </div>
            <nav className="sidebar-nav">
                <div className="sidebar-section">
                    <h2 className="sidebar-section-title">Dashboard</h2>
                    {menuItems.filter(item => item.section === 'Dashboard').map((item) => (
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
                <div className="sidebar-section">
                    <h2 className="sidebar-section-title">Utilities</h2>
                    {menuItems.filter(item => item.section === 'Utilities').map((item) => (
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
                <div className="sidebar-section">
                    <h2 className="sidebar-section-title">Help</h2>
                    <button
                        onClick={() => setActiveMenu('help')}
                        className={`flex items-center ${activeMenu === 'help' ? "active" : ""}`}
                        aria-label="Help"
                    >
                        <FaQuestionCircle className="icon" />
                        {isSidebarOpen && <span>Help</span>}
                    </button>
                </div>
            </nav>
        </aside>
    );
};

export default AdminSideBar;