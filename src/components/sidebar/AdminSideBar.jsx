import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaCalendarAlt, FaHandshake, FaFileAlt, FaFileContract, FaQuestionCircle } from 'react-icons/fa';
import '../com-designs/AdminSideBar.css';
import { MdOutlineStop } from 'react-icons/md';

// eslint-disable-next-line react/prop-types
const AdminSideBar = ({ isSidebarOpen, setActiveMenu, activeMenu }) => {
    const navigate = useNavigate();

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt, section: 'Dashboard', path: '/admin/dashboard' },
        { id: 'user', label: 'User', icon: FaUser, section: 'Utilities', path: '/admin/users' },
        { id: 'calendar', label: 'Calendar', icon: FaCalendarAlt, section: 'Utilities', path: '/schedule' },
        { id: 'business-partner', label: 'Business Partner', icon: FaHandshake, section: 'Utilities', path: '/viewbusinesspartner' },
        { id: 'location', label: 'Business location', icon: MdOutlineStop, section: 'Utilities', path: '/location' },
        { id: 'report', label: 'Report', icon: FaFileAlt, section: 'Utilities', path: '/report' },
        { id: 'contract', label: 'Contract', icon: FaFileContract, section: 'Utilities', path: '/contract' },
        { id: 'help', label: 'Help', icon: FaQuestionCircle, section: 'Help', path: '/help' },
    ];

    const handleMenuClick = (id, path) => {
        setActiveMenu(id);
        navigate(path);
    };

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
                            onClick={() => handleMenuClick(item.id, item.path)}
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
                            onClick={() => handleMenuClick(item.id, item.path)}
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
                    {menuItems.filter(item => item.section === 'Help').map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleMenuClick(item.id, item.path)}
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

export default AdminSideBar;