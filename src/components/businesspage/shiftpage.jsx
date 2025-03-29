import { Table } from 'antd';
import React, { useEffect, useState } from 'react';

function ShiftPageBusiness() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://localhost:7217/shift-types')
            .then(response => response.json())
            .then(data => {
                if (data.isSuccess) {
                    const formattedData = data.result.map((item, index) => ({
                        key: index,
                        name: item.name,
                        description: item.description,
                        shiftTime: item.shiftTime
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
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Shift Time',
            dataIndex: 'shiftTime',
            key: 'shiftTime',
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Shift Types</h1>
            <Table dataSource={dataSource} columns={columns} loading={loading} />
        </div>
    );
}

export default ShiftPageBusiness;