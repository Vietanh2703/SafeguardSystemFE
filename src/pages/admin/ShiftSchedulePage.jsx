/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import AdminSideBar from '../../components/sidebar/AdminSideBar';
import NavBar from '../../components/NavBar';

const ShiftSchedulePage = () => {
    const [shifts, setShifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeMenu, setActiveMenu] = useState('schedule');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://localhost:7217/shift-types')
            .then(response => {
                if (response.data.isSuccess) {
                    setShifts(response.data.result);
                }
            })
            .catch(error => console.error('Error fetching shift types:', error))
            .finally(() => setLoading(false));
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    if (loading) {
        return (
            <div className="p-4 grid gap-4">
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
            </div>
        );
    }

    return (
        <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
        <NavBar 
            isDarkMode={isDarkMode} 
            toggleDarkMode={toggleDarkMode} 
            activeMenuLabel="Shift Schedule" 
        />
        
        <div className="flex flex-1">
            <AdminSideBar
                isSidebarOpen={isSidebarOpen}
                setActiveMenu={setActiveMenu}
                activeMenu={activeMenu}
            />
    
    <div className="flex-1 p-12 bg-gradient-to-r from-green-100 to-green-200 flex flex-col items-center mt-25 ml-50">
    <h1 className="text-4xl font-bold text-black-700 mb-8">Thời Khóa Biểu</h1>

    {shifts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Không có ca làm việc nào.</p>
    ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {shifts.map((shift, index) => (
                <div 
                    key={index} 
                    className="bg-white shadow-lg rounded-2xl p-8 border border-green-300"
                >
                    <h2 className="text-2xl font-semibold text-green-600 mb-3">{shift.name}</h2>
                    <p className="text-gray-700 mb-3 text-lg">{shift.description}</p>
                    <p className="text-md text-gray-500">{shift.shiftTime}</p>
                </div>
            ))}
        </div>
    )}

    <div className="flex justify-center mt-12">
        <button
            type="button" 
            className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg"
            onClick={() => navigate("/admin")}
        >
            Go Back 
        </button>
    </div>
</div>
        </div>
    </div>
    );
};

export default ShiftSchedulePage;
