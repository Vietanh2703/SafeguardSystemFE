import { Table } from 'antd';
import React, { useEffect, useState } from 'react';

function ViewReports() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://localhost:7217/reports')
            .then(response => response.json())
            .then(data => {
                if (data.isSuccess) {
                    const formattedData = data.result.map((item, index) => ({
                        key: index,
                        reportName: item.reportId, // Hoặc item.sender nếu muốn hiển thị người gửi
                        description: item.reportComment,
                        createdAt: new Date(item.createdAt).toLocaleString()
                    }));
                    setDataSource(formattedData);
                }
            })
            .catch(error => console.error('Error fetching reports:', error))
            .finally(() => setLoading(false));
    }, []);

    const columns = [
        {
            title: 'Report Name',
            dataIndex: 'reportName',
            key: 'reportName',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Report List</h1>
            <Table dataSource={dataSource} columns={columns} loading={loading} />
        </div>
    );
}

export default ViewReports;