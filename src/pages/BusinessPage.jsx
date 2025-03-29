import React, { useState } from 'react';

import NavBar from '../components/NavBar.jsx';
import '../designs/BusinessPage.css';

import { Outlet } from 'react-router-dom';
import BusinessSideBar from '../components/sidebar/BusinessSideBar.jsx';

const BusinessPartner = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState('checkpoint');

    const menuItems = {
        checkpoint: 'Checkpoint',
        team: 'Team',
        shifts: 'Shifts'
    };

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar activeMenuLabel={menuItems[activeMenu]} />
            <div className="flex flex-1">
                <BusinessSideBar
                    isSidebarOpen={isSidebarOpen}
                    setActiveMenu={setActiveMenu}
                    activeMenu={activeMenu}
                />
                <div className="flex-1 p-8 bg-gray-100 content-container">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">{menuItems[activeMenu]} Page</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Welcome to the {menuItems[activeMenu]} section.
                    </p>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default BusinessPartner;