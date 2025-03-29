/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import { useNavigate } from 'react-router-dom'; 

const CreateLocationBusiness = () => {
    const [businesses, setBusinesses] = useState([]);
    const [selectedBusinessId, setSelectedBusinessId] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeMenu, setActiveMenu] = useState();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        image: '',
        latitude: '',
        longitude: '',
    });

       const navigate = useNavigate();

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const response = await axios.get('https://localhost:7217/business-partners');
                if (response.data.isSuccess) {
                    setBusinesses(response.data.result || []);
                } else {
                    alert('Không thể tải danh sách đối tác.');
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách đối tác:', error);
                alert('Lỗi khi tải danh sách đối tác.');
            }
        };
        fetchBusinesses();
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };


    const handleSubmit = async () => {
        if (!selectedBusinessId) {
            alert('Vui lòng chọn một đối tác.');
            return;
        }

        try {
            const response = await axios.post(
                `https://localhost:7217/location?businessId=${selectedBusinessId}`,
                formData
            );

            if (response.data.isSuccess) {
                alert('Tạo địa điểm thành công!');
            } else {
                alert(response.data.message || 'Lỗi khi tạo địa điểm.');
            }
        } catch (error) {
            console.error('Lỗi khi tạo địa điểm:', error);
            alert(`Lỗi khi tạo địa điểm: ${error.message}`);
        }
    };

    return (

         <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
              
              <NavBar 
                    isDarkMode={isDarkMode} 
                    toggleDarkMode={toggleDarkMode} 
                    activeMenuLabel="Shift Schedule" 
                />
                
                
 <div className="p-40 min-h-screen bg-gradient-to-r from-white-100 to-white-100 flex items-center justify-start">

 <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md ml-120">
        <h1 className="text-4xl font-bold text-black-600 mb-8 text-center">Tạo Địa Điểm Mới</h1>

        <label className="block mb-2 text-gray-700">Chọn Đối Tác</label>
        <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 mb-6"
            value={selectedBusinessId}
            onChange={(e) => setSelectedBusinessId(e.target.value)}
        >
            <option value="">-- Chọn đối tác --</option>
            {businesses.map((business) => (
                <option key={business.businessId} value={business.businessId}>
                    {business.name}
                </option>
            ))}
        </select>

        {['name', 'address', 'image', 'latitude', 'longitude'].map((field) => (
            <div key={field} className="mb-4">
                <label className="block mb-2 capitalize text-gray-700">{field}</label>
                <input
                    type={field === 'latitude' || field === 'longitude' ? 'number' : 'text'}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                />
            </div>
        ))}

        <button
            className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={handleSubmit}
        >
            Tạo Địa Điểm
        </button>

        <div className="flex justify-center mt-6">
            <button
                type="button" 
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
                onClick={() => navigate("/businesspartner")}
            >
                Quay Lại
            </button>
        </div>
    </div>
</div>
      
        </div>
    
    );
};

export default CreateLocationBusiness;
