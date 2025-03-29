import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

function ViewLocations() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await axios.get('https://localhost:7217/location-pagings?pageNumber=1&pageSize=5');
            if (response.data.isSuccess) {
                setLocations(response.data.result || []);
            }
        } catch (error) {
            console.error('Error fetching locations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (locationId) => {
        console.log('LocationId gửi đi:', locationId);

        if (!locationId) {
            console.error('Không tìm thấy locationId hợp lệ!');
            return;
        }

        if (window.confirm('Bạn có chắc chắn muốn xóa địa điểm này?')) {
            try {
                await axios.delete(`https://localhost:7217/${locationId}/delete`);
                message.success('Delete success');
                fetchLocations();
            } catch (error) {
                console.error('Lỗi khi xóa địa điểm:', error);
                message.error('Failed to delete location');
            }
        }
    };

    const handleUpdate = async (values) => {
        if (!selectedLocation) return;

        try {
            await axios.put(`https://localhost:7217/${selectedLocation}/update`, values);
            message.success('Update success');
            setIsModalOpen(false);
            fetchLocations();
        } catch (error) {
            console.error('Error updating location:', error);
            message.error('Failed to update location');
        }
    };

    const openUpdateModal = (location) => {
        setSelectedLocation(location.locationid);
        form.setFieldsValue({
            name: location.name,
            address: location.address,
            image: location.image,
            latitude: location.latitude,
            longitude: location.longitude
        });
        setIsModalOpen(true);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },

      
        {
            title: 'Latitude',
            dataIndex: 'latitude',
            key: 'latitude',
        },
        {
            title: 'Longitude',
            dataIndex: 'longitude',
            key: 'longitude',
        },

        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button type="primary" style={{ marginRight: '10px' }} onClick={() => openUpdateModal(record)}>Update</Button>
                    <Button danger onClick={() => handleDelete(record.locationid)}>Delete</Button>
                </>
            ),
        },
    ];

    return (
        <>
            <Button type="primary" onClick={() => navigate('/create-locationbusiness')}>Create Location</Button>
            <Table dataSource={locations} columns={columns} loading={loading} />

            <Modal
                title="Update Location"
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={handleUpdate} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please enter the address' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="image" label="Image">
                        <Input />
                    </Form.Item>

                    <Form.Item name="latitude" label="Latitude">
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item name="longitude" label="Longitude">
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default ViewLocations;