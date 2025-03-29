import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import BusinessSideBar from '../sidebar/BusinessSideBar';

import NavBar from '../NavBar';


function ShiftPageBusiness() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState('viewshiftschedule');

    useEffect(() => {
        fetch('https://localhost:7217/shifts')
            .then(response => response.json())
            .then(data => {
                if (data.isSuccess) {
                    const formattedData = data.result.map((item, index) => ({
                        key: index,
                        name: item.typeName,
                        description: item.locationName,
                        team: item.teamName,
                        shiftDate: item.shiftDate,
                        shiftTime: `${item.startTime} - ${item.endTime}`
                    }));
                    setDataSource(formattedData);
                }
            })
            .catch(error => console.error('Error fetching shift types:', error))
            .finally(() => setLoading(false));
    }, []);

    const columns = [
        {
            title: 'Shift Name',
            dataIndex: 'name',
            key: 'name',
            onCell: () => ({ style: { backgroundColor: '#FFEBEE', fontWeight: 'bold' } }), // Màu đỏ nhạt
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            onCell: () => ({ style: { backgroundColor: '#E3F2FD', fontWeight: 'bold' } }), // Màu xanh nhạt
        },
        {
            title: 'Team',
            dataIndex: 'team',
            key: 'team',
            onCell: () => ({ style: { backgroundColor: '#E8F5E9', fontWeight: 'bold' } }), // Màu xanh lá nhạt
        },
        {
            title: 'Shift Date',
            dataIndex: 'shiftDate',
            key: 'shiftDate',
            onCell: () => ({ style: { backgroundColor: '#FFF3E0', fontWeight: 'bold' } }), // Màu cam nhạt
        },
        {
            title: 'Shift Time',
            dataIndex: 'shiftTime',
            key: 'shiftTime',
            onCell: () => ({ style: { backgroundColor: '#F3E5F5', fontWeight: 'bold' } }), // Màu tím nhạt
        },
    ];
    

    return (
        <div className="flex h-screen">
    {/* Sidebar */}
    <BusinessSideBar isSidebarOpen={isSidebarOpen} setActiveMenu={setActiveMenu} activeMenu={activeMenu} />

    {/* Main Content */}
    <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <NavBar activeMenuLabel="Shift Schedule" />

        {/* Page Content */}
        <div className="p-6 mt-25 ml-60"> {/* Thêm mt-20 ở đây */}
            <h1 className="text-2xl font-bold mb-4">Shift Details</h1>
            <Table dataSource={dataSource} columns={columns} loading={loading} />
        </div>
    </div>
</div>

    );
}

export default ShiftPageBusiness;
