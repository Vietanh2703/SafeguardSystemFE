import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const CreateLocation = () => {
    const [businesses, setBusinesses] = useState([]);
    const [selectedBusinessId, setSelectedBusinessId] = useState('');
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
                const response = await axios.get('https://localhost:7217/api/Admin/view-all-business-partners');
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

    const handleSubmit = async () => {
        if (!selectedBusinessId) {
            alert('Vui lòng chọn một đối tác.');
            return;
        }

        try {
            const response = await axios.post(
                `https://localhost:7217/create-location?businessId=${selectedBusinessId}`,
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
        <div className="p-8 min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center">
            
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Tạo Địa Điểm Mới</h1>

                <label className="block mb-2 text-gray-700">Chọn Đối Tác</label>
                <select
                    className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
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
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
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
        </div>
    );
};

export default CreateLocation;
