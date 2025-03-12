import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LocationPage = () => {
    const [locations, setLocations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
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

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="p-8 min-h-screen bg-gradient-to-r from-green-50 to-green-100 relative">
            {/* Nút tạo địa điểm ở góc trên bên phải */}
            <div className="absolute top-4 right-4">
                <button
                    type="button"
                    className="bg-green-500 text-white px-6 py-3 rounded"
                    onClick={() => navigate('/create-location')}
                >
                    Create Location
                </button>
            </div>
    
            <h1 className="text-3xl font-bold text-green-700 mb-6">Danh sách Địa Điểm</h1>
            {loading ? (
                <p className="text-center text-blue-500">Đang tải dữ liệu...</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {locations.length > 0 ? (
                        locations.map((location, index) => (
                            <div key={index} className="bg-white shadow-md rounded-xl p-6 border border-green-200">
                                <h2 className="text-xl font-semibold text-green-600 mb-2">{location.name}</h2>
                                <p className="text-gray-700 mb-2">Vĩ độ: {location.latitude}</p>
                                <p className="text-gray-700">Kinh độ: {location.longitude}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Không có địa điểm nào.</p>
                    )}
                </div>
            )}
    
            <div className="flex justify-between items-center p-4 mt-8">
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
    
                <span>Trang {currentPage} của {totalPages}</span>
    
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
    
            <div className="flex justify-center mt-8">
                <button
                    type="button"
                    className="bg-green-500 text-white px-6 py-3 rounded mr-4"
                    onClick={() => navigate('/admin')}
                >
                    Go back
                </button>
            </div>
        </div>
    );
    
};

export default LocationPage;
