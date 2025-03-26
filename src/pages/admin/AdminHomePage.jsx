/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminSideBar from '../../components/sidebar/AdminSideBar.jsx';
import NavBar from '../../components/NavBar.jsx';
import '../../designs/AdminPage.css';


const AdminHomePage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const menuItems = {
        dashboard: 'Dashboard',
        user: 'User',
        calendar: 'Calendar',
        'business-partner': 'Business Partner',
        location: 'Location',
        report: 'Report',
        contract: 'Contract'
    };

    useEffect(() => {
        if (localStorage.getItem("login_success") === "true") {
            toast.success("Login successful!");
            localStorage.removeItem("login_success");
        }

        setIsLoading(false);
    }, []);

    const handleMenuClick = (id) => {
        setIsLoading(true);
        setActiveMenu(id);
       
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
            <ToastContainer />
            <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} activeMenuLabel={menuItems[activeMenu]} />

            <div className="flex flex-1">
                <AdminSideBar
                    isSidebarOpen={isSidebarOpen}
                    setActiveMenu={handleMenuClick}
                    activeMenu={activeMenu}
                />
                <div className="flex-1 p-8 bg-gray-100 content-container">
                    {isLoading ? (
                        <div className="loading-spinner">Loading...</div>
                    ) : (
                        <>
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
                            <p className="text-lg text-gray-600 mb-8">
                                Welcome to the admin page. Here you can manage all the administrative tasks.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;