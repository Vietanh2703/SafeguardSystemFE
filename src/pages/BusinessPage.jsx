import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm hook điều hướng
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BusinessSideBar from '../components/sidebar/BusinessSideBar.jsx';
import NavBar from '../components/NavBar.jsx';
import '../designs/BusinessPage.css';

const BusinessPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate(); // Khai báo hook điều hướng

    const menuItems = {
        dashboard: 'Dashboard',
        viewshift: 'View Shift',
        checkpoint: 'Check Point',
        report: 'Report',
        contract : 'Contract'
    };

    // Hiện thông báo khi đăng nhập thành công
    useEffect(() => {
        if (localStorage.getItem("login_success") === "true") {
            toast.success("Login successful!");
            localStorage.removeItem("login_success");
        }
    }, []);

    // Xử lý chuyển menu và điều hướng
    const handleMenuClick = (menu) => {
        setIsLoading(true); // Hiển thị trạng thái loading
        setActiveMenu(menu);

        // Điều hướng đến trang tương ứng
        switch (menu) {
            case 'dashboard':
                navigate('/dashboard');
                break;
            case 'viewshift':
                navigate('/viewshift');
                break;
            case 'checkpoint':
                navigate('/checkpoint');
                break;
            case 'report':
                navigate('/viewreport');
                break;
            default:
                navigate('/dashboard');
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
            <ToastContainer />
            <NavBar 
                isDarkMode={isDarkMode} 
                toggleDarkMode={toggleDarkMode} 
                activeMenuLabel={menuItems[activeMenu]} 
            />
            <div className="flex flex-1">
                <BusinessSideBar
                    isSidebarOpen={isSidebarOpen}
                    setActiveMenu={handleMenuClick}
                    activeMenu={activeMenu}
                />
                <div className="flex-1 p-8 bg-gray-100 content-container">
                    {isLoading ? (
                        <div className="loading-spinner">Loading...</div>
                    ) : (
                        <>
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">Business page</h1>
                            <p className="text-lg text-gray-600 mb-8">
                                Welcome to the business user interface.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BusinessPage;
