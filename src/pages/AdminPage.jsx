/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import thêm useNavigate để chuyển trang
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminSideBar from '../components/sidebar/AdminSideBar';
import NavBar from '../components/NavBar.jsx';
import '../designs/AdminPage.css';

const AdminPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [isDarkMode, setIsDarkMode] = useState(false);

    const navigate = useNavigate();

    const menuItems = {
        dashboard: 'Dashboard',
        user: 'User',
        calendar: 'Calendar',
        'business-partner': 'Business Partner',
        location: 'location',
        report: 'Report',
        contract: 'Contract'
    };

    useEffect(() => {
        if (localStorage.getItem("login_success") === "true") {
            toast.success("Login successful!");
            localStorage.removeItem("login_success");
        }

        // Điều hướng đến trang User List nếu chọn menu "User"
        if (activeMenu === 'user') {
            navigate('/users');
        }else if(activeMenu === 'business-partner'){
            navigate('/viewbusinesspartner');
        }else if(activeMenu === 'calendar'){
            navigate('/Schedule');
        }else if(activeMenu === 'location'){
            navigate('/location');
        }
    }, [activeMenu]);

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
                    setActiveMenu={setActiveMenu}
                    activeMenu={activeMenu}
                />
                <div className="flex-1 p-8 bg-gray-100 content-container">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Welcome to the admin dashboard. Here you can manage all the administrative tasks.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
