import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
function TeamPageBusiness() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });

    const fetchTeams = (pageNumber, pageSize) => {
        setLoading(true);
        fetch(`https://localhost:7217/teams?pageNumber=${pageNumber}&pageSize=${pageSize}`)
            .then(response => response.json())
            .then(data => {
                if (data.isSuccess && data.result) {
                    const formattedData = data.result.map((item, index) => ({
                        key: index,
                        name: item.name
                    }));
                    setDataSource(formattedData);
                    setPagination(prev => ({
                        ...prev,
                        current: pageNumber,
                        pageSize: pageSize,
                        total: formattedData.length // Giả định tổng số lượng, cần API cung cấp total thực tế
                    }));
                }
            })
            .catch(error => console.error('Error fetching teams:', error))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchTeams(pagination.current, pagination.pageSize);
    }, []);

    const handleTableChange = (pagination) => {
        fetchTeams(pagination.current, pagination.pageSize);
    };

    const columns = [
        {
            title: 'Team Name',
            dataIndex: 'name',
            key: 'name',
        }
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Team List</h1>
            <Table
                dataSource={dataSource}
                columns={columns}
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
            />
        </div>
    );
}

export default TeamPageBusiness;

// import { Table, Button, message } from 'antd';
// import React, { useEffect, useState } from 'react';

// function TeamPageBusiness() {
//     const [dataSource, setDataSource] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [pagination, setPagination] = useState({
//         current: 1,
//         pageSize: 10,
//         total: 0
//     });

//     const fetchTeams = (pageNumber, pageSize) => {
//         setLoading(true);
//         fetch(`https://localhost:7217/teams?pageNumber=${pageNumber}&pageSize=${pageSize}`)
//             .then(response => response.json())
//             .then(data => {
//                 if (data.isSuccess && data.result) {
//                     const formattedData = data.result.map((item, index) => ({
//                         key: item.teamId,  // Sử dụng teamId làm key
//                         name: item.name,
//                         teamId: item.teamId
//                     }));
//                     setDataSource(formattedData);
//                     setPagination(prev => ({
//                         ...prev,
//                         current: pageNumber,
//                         pageSize: pageSize,
//                         total: formattedData.length // API cần cung cấp total thực tế
//                     }));
//                 }
//             })
//             .catch(error => console.error('Error fetching teams:', error))
//             .finally(() => setLoading(false));
//     };

//     useEffect(() => {
//         fetchTeams(pagination.current, pagination.pageSize);
//     }, []);

//     const handleTableChange = (pagination) => {
//         fetchTeams(pagination.current, pagination.pageSize);
//     };

//     const fetchGuards = async (teamId) => {
//         try {
//             const response = await fetch(`https://localhost:7217/${teamId}/guards`);
//             const data = await response.json();

//             if (response.ok && data.isSuccess) {
//                 message.success("Successfully retrieved guards.");
//                 console.log("Danh sách bảo vệ:", data.result);
//             } else {
//                 message.error("Failed to retrieve guards.");
//             }
//         } catch (error) {
//             console.error("Error fetching guards:", error);
//             message.error("Failed to retrieve guards.");
//         }
//     };


//     const columns = [
//         {
//             title: 'Team Name',
//             dataIndex: 'name',
//             key: 'name',
//         },
//         {
//             title: 'Actions',
//             key: 'actions',
//             render: (text, record) => (
//                 <Button type="primary" onClick={() => fetchGuards(record.teamId)}>
//                     Detail
//                 </Button>
//             )
//         }
//     ];

//     return (
//         <div>
//             <h1 className="text-2xl font-bold mb-4">Team List</h1>
//             <Table
//                 dataSource={dataSource}
//                 columns={columns}
//                 loading={loading}
//                 pagination={pagination}
//                 onChange={handleTableChange}
//             />
//         </div>
//     );
// }

// export default TeamPageBusiness;
