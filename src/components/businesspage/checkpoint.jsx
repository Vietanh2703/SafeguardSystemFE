import { Button, Form, Input, Modal, Table, Spin, Popconfirm, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function CheckPointBusiness() {
    const [isOpen, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [checkpoints, setCheckpoints] = useState([]);
    const [loadingTable, setLoadingTable] = useState(false);
    const [editingCheckpoint, setEditingCheckpoint] = useState(null);

    const LOCATION_ID = 'c86114da-36c8-4644-8ab0-dbdcb5c2f830';
    const API_BASE_URL = 'https://localhost:7217';

    // Fetch danh sách checkpoint
    const fetchCheckpoints = async () => {
        setLoadingTable(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/${LOCATION_ID}/checkpoints`);
            console.log("API Response:", response.data); // Kiểm tra response từ API

            if (response.data.isSuccess) {
                console.log("Checkpoints List:", response.data.result); // Kiểm tra danh sách checkpoints
                setCheckpoints(response.data.result.map(cp => ({
                    ...cp,
                    key: cp.checkpointid // Đảm bảo key đúng
                })));
            } else {
                toast.error('Failed to fetch checkpoints!');
            }
        } catch (error) {
            console.error('Error fetching checkpoints:', error);
            toast.error('Error fetching checkpoints!');
        } finally {
            setLoadingTable(false);
        }
    };

    useEffect(() => {
        fetchCheckpoints();
    }, []);

    const handleOpenModal = (checkpoint = null) => {
        setEditingCheckpoint(checkpoint);
        setOpen(true);
        form.setFieldsValue(checkpoint || { name: '', description: '' });
    };

    const handleCloseModal = () => {
        setOpen(false);
        form.resetFields();
        setEditingCheckpoint(null);
    };

    // Thêm hoặc cập nhật checkpoint
    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            if (editingCheckpoint) {
                // Cập nhật checkpoint
                const response = await axios.put(`${API_BASE_URL}/checkpoint?checkpointid=${editingCheckpoint.checkpointid}`, values);
                if (response.data.isSuccess) {
                    toast.success('Checkpoint updated successfully!');
                } else {
                    toast.error('Failed to update checkpoint!');
                }
            } else {
                // Thêm checkpoint mới
                const response = await axios.post(`${API_BASE_URL}/checkpoint`, { ...values, locationId: LOCATION_ID });
                if (response.data.isSuccess) {
                    toast.success('Checkpoint added successfully!');
                } else {
                    toast.error('Failed to add checkpoint!');
                }
            }
            handleCloseModal();
            fetchCheckpoints();
        } catch (error) {
            console.error('Error saving checkpoint:', error);
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    // Xóa checkpoint
    // Xóa checkpoint
    const handleDelete = async (checkpointid) => {
        if (!checkpointid) {
            toast.error('Invalid checkpoint ID!');
            return;
        }
        setLoadingTable(true); // Hiển thị loading khi đang xóa
        try {
            const response = await axios.delete(`${API_BASE_URL}/checkpoint/${checkpointid}`);
            console.log("Delete response:", response.data); // Debugging
            if (response.data.isSuccess) {
                toast.success('Checkpoint deleted successfully!');
                fetchCheckpoints(); // Cập nhật lại danh sách sau khi xóa
            } else {
                toast.error('Failed to delete checkpoint!');
            }
        } catch (error) {
            console.error('Error deleting checkpoint:', error);
            toast.error('Error deleting checkpoint!');
        } finally {
            setLoadingTable(false); // Tắt loading sau khi xóa xong
        }
    };


    // Cấu hình cột bảng
    const columns = [
        {
            title: 'Checkpoint Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => handleOpenModal(record)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this checkpoint?"
                        onConfirm={() => handleDelete(record.checkpointid)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <ToastContainer />
            <Button type="primary" onClick={() => handleOpenModal()} style={{ marginBottom: 16 }}>
                Create checkpoint
            </Button>

            {loadingTable ? <Spin size="large" /> : <Table dataSource={checkpoints} columns={columns} rowKey="checkpointid" />}

            <Modal
                title={editingCheckpoint ? 'Edit Checkpoint' : 'Create Checkpoint'}
                open={isOpen}
                onCancel={handleCloseModal}
                footer={null}
            >
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item name="name" rules={[{ required: true, message: 'Please enter checkpoint name!' }]}>
                        <Input placeholder="Checkpoint Name" />
                    </Form.Item>
                    <Form.Item name="description" rules={[{ required: true, message: 'Please enter description!' }]}>
                        <Input placeholder="Description" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {editingCheckpoint ? 'Update' : 'Submit'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default CheckPointBusiness;
