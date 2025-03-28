import { Button, Form, Input, Modal, Table, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CheckPointBusiness() {
    const [isOpen, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [checkpoints, setCheckpoints] = useState([]);
    const [loadingTable, setLoadingTable] = useState(false);

    const LOCATION_ID = 'c86114da-36c8-4644-8ab0-dbdcb5c2f830';

    // Fetch danh sách checkpoint
    const fetchCheckpoints = async () => {
        setLoadingTable(true);
        try {
            const response = await fetch(`https://localhost:7217/${LOCATION_ID}/checkpoints`);
            const data = await response.json();
            if (data.isSuccess) {
                setCheckpoints(data.result);
            } else {
                toast.error('Failed to fetch checkpoints!');
            }
        } catch (error) {
            toast.error('Error fetching checkpoints!');
        } finally {
            setLoadingTable(false);
        }
    };

    useEffect(() => {
        fetchCheckpoints();
    }, []);

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        form.resetFields();
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await fetch('https://localhost:7217/checkpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    name: values.name,
                    description: values.description,
                    locationId: LOCATION_ID,
                }),
            });

            const data = await response.json();
            if (data.isSuccess) {
                toast.success('Checkpoint added successfully!');
                handleCloseModal();
                fetchCheckpoints();
            } else {
                toast.error('Failed to add checkpoint!');
            }
        } catch (error) {
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    // Cấu hình cột bảng (Bỏ locationId)
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
    ];

    return (
        <div>
            <ToastContainer />
            <Button type="primary" onClick={handleOpenModal} style={{ marginBottom: 16 }}>
                Create checkpoint
            </Button>

            {loadingTable ? (
                <Spin size="large" />
            ) : (
                <Table dataSource={checkpoints} columns={columns} rowKey="name" />
            )}

            <Modal
                title="Create new checkpoint"
                open={isOpen}
                onCancel={handleCloseModal}
                footer={null}
            >
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please enter checkpoint name!' }]}
                    >
                        <Input placeholder="Checkpoint Name" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        rules={[{ required: true, message: 'Please enter description!' }]}
                    >
                        <Input placeholder="Description" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default CheckPointBusiness;
