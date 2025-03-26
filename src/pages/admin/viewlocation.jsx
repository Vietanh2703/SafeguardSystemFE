/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminSideBar from '../../components/sidebar/AdminSideBar';
import NavBar from '../../components/NavBar';

const LocationPage = () => {
    const [locations, setLocations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeMenu, setActiveMenu] = useState('location');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLocations = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://localhost:7217/locations?pageNumber=${currentPage}&pageSize=5`);
                if (response.data.isSuccess) {
                    setLocations(response.data.result);
                    setTotalPages(response.data.totalPages || 1);
                } else {
                    throw new Error(response.data.message || 'Failed to load locations');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, [currentPage]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (error) return <p className="text-center text-red-500">{error}</p>;

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
    
            <div className="p-12 min-h-screen bg-gradient-to-br from-green-100 to-green-200 relative  ml-64">         
               
                <div className="absolute top-4 right-4">
                    <button
                        type="button"
                        className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-md transition-all mt-25"
                        onClick={() => navigate('/create-location')}
                    >
                         Create Location
                    </button>
                </div>
    
                <div className="flex flex-col items-center mt-35">
                    <h1 className="text-4xl font-extrabold text-black-700 mb-8">
                         Danh sách Địa Điểm
                    </h1>
    
                    {loading ? (
                        <p className="text-center text-blue-500 text-xl">Đang tải dữ liệu...</p>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-12">
                            {locations.length > 0 ? (
                                locations.map((location, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-white shadow-lg rounded-2xl p-6 border border-green-300 hover:shadow-xl transition-all"
                                    >
                                        <h2 className="text-2xl font-bold text-green-600 mb-2 flex items-center">
                                            <FaMapMarkerAlt className="text-green-500 mr-2" />
                                            {location.name}
                                        </h2>
                                        <p className="text-gray-700 text-lg"> Vĩ độ: {location.latitude}</p>
                                        <p className="text-gray-700 text-lg"> Kinh độ: {location.longitude}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 text-lg">Không có địa điểm nào.</p>
                            )}
                        </div>
                    )}
    
                    <div className="flex justify-between items-center p-4 mt-10 w-full px-12">
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md transition-all disabled:opacity-50"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                             Previous
                        </button>
    
                        <span className="text-lg">Trang {currentPage} của {totalPages}</span>
    
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md transition-all disabled:opacity-50"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next 
                        </button>
                    </div>
    
                    <div className="flex justify-center mt-8">
                        <button
                            type="button"
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl shadow-md transition-all"
                            onClick={() => navigate('/admin')}
                        >
                             Go back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
    
};

export default LocationPage;
