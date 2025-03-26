import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BusinessSideBar from '../components/sidebar/BusinessSideBar.jsx';
import NavBar from '../components/NavBar.jsx';
import '../designs/BusinessPage.css';

const BusinessPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [isDarkMode, setIsDarkMode] = useState(false);

    const menuItems = {
        //Sửa label và section
        dashboard: 'Dashboard',
        user: 'User',
        calendar: 'Calendar',
        'business-partner': 'Business Partner',
        report: 'Report',
        contract: 'Contract'
    };

    //Hiện thông báo khi đăng nhập thành công
    useEffect(() => {
        if (localStorage.getItem("login_success") === "true") {
            toast.success("Login successful!");
            localStorage.removeItem("login_success"); // Remove to avoid showing after refresh
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
            <ToastContainer />
            <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} activeMenuLabel={menuItems[activeMenu]} />
            <div className="flex flex-1">
                <BusinessSideBar
                    isSidebarOpen={isSidebarOpen}
                    setActiveMenu={setActiveMenu}
                    activeMenu={activeMenu}
                />
                <div className="flex-1 p-8 bg-gray-100 content-container">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Business page</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Welcome to the business user interface.
                    </p>
                    {/* Add other components or content for the AdminPage here */}
                </div>
            </div>
        </div>
    );
};

export default BusinessPage;