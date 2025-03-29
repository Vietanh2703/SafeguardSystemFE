import React from 'react';
import { FaUsers, FaClock, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import '../com-designs/BusinessSideBar.css';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const BusinessSideBar = ({ isSidebarOpen, setActiveMenu, activeMenu }) => {
    const menuItems = [
        { id: 'checkpoint', label: <Link to={"checkpoint"}>Checkpoint</Link>, icon: FaMapMarkerAlt },
        { id: 'report', label: <Link to={"report"}>Report</Link>, icon: FaUsers }, // Giữ nguyên (biểu tượng người dùng phù hợp với báo cáo)
        { id: 'locations', label: <Link to={"locations"}>Location</Link>, icon: FaMapMarkerAlt }, // Đổi sang icon bản đồ
        { id: 'viewshiftschedule', label: <Link to={"viewshiftschedule"}>ShiftSchedule</Link>, icon: FaCalendarAlt } // Đổi sang icon lịch
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