import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../../designs/BusinessPage.css';

const ShiftSchedulePage = () => {
    const [shifts, setShifts] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <div className="p-8 min-h-screen bg-gradient-to-r from-green-50 to-green-100">
            <h1 className="text-3xl font-bold text-green-700 mb-6">Thời Khóa Biểu</h1>
            {shifts.length === 0 ? (
                <p className="text-center text-gray-500">Không có ca làm việc nào.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {shifts.map((shift, index) => (
                        <div key={index} className="bg-white shadow-md rounded-xl p-6 border border-green-200">
                            <h2 className="text-xl font-semibold text-green-600 mb-2">{shift.name}</h2>
                            <p className="text-gray-700 mb-2">{shift.description}</p>
                            <p className="text-sm text-gray-500">{shift.shiftTime}</p>
                        </div>
                    ))}
                </div>
            )}
                <div className="flex justify-center mt-8">
                <button
                    type="button" 
                    className="bg-green-500 text-white px-6 py-3 rounded mr-4"
                    onClick={() => navigate("/admin")}
                >
                    Go Back 
                </button>
                </div>
        </div>
    );
};

export default ShiftSchedulePage;
