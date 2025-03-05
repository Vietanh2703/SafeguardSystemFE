


import React, { useEffect, useState } from 'react';
import { Table, Image, Button, Modal, Form, Input, Select } from 'antd';
import axios from 'axios';
import api from '../../../config/axios'; // Đảm bảo api được cấu hình đúng
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Đảm bảo thêm stylesheet cho Toast
import { useForm } from 'antd/es/form/Form';

function ManageUser() {
  const [userList, setUserList] = useState([]);
  const [total, setTotal] = useState(0); // Tổng số lượng người dùng
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // Hiển thị Modal tạo người dùng
  const [form] = useForm();

  // Các RoleId có sẵn
  const roleOptions = [
    { label: "Manager", value: "6be95231-36aa-4a26-8c61-b65e040ec32a" },
    { label: "Admin", value: "7a04e1d4-c176-467d-ac7d-6e1433ce6f3e" },
    { label: "Business Partner", value: "be19e4b3-6664-4afd-9ebb-98e0a073edc9" },
    { label: "Security Guard", value: "d1616b66-90cc-479f-b45e-1e86378937f7" }
  ];

  // Hàm lấy dữ liệu từ API với phân trang
  const fetchUser = async (pageIndex, pageSize) => {
    try {
      const response = await api.get('Admin/view-all-users', {
        params: {
          pageIndex: pageIndex, // Truyền pageIndex
          pageSize: pageSize,   // Truyền pageSize
        }
      });
      console.log(response.data);
      setUserList(response.data.result);
      setTotal(response.data.totalCount);
      console.log(response.data.totalCount)  // Giả sử API trả về tổng số bản ghi
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Gọi API khi component mount hoặc khi thay đổi trang
  useEffect(() => {
    fetchUser(currentPage, 10); // Mặc định pageSize là 10
  }, [currentPage]);

  // Hàm xử lý thay đổi trang
  const handlePaginationChange = (page) => {
    setCurrentPage(page);  // Cập nhật trang hiện tại
  };

  // Hàm hiển thị modal để tạo người dùng mới
  const showModal = () => {
// Reset form mỗi khi mở modal\
    form.resetFields();
    setIsModalVisible(true);
  };

  // Hàm đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Hàm gửi yêu cầu tạo người dùng mới
  const handleCreateUser = async (values) => {
    try {
      // Thực hiện API call để tạo người dùng
      const response = await api.post('Admin/create-user', values);

      if (response.status === 200) {
        // Hiển thị thông báo thành công
        toast.success('User created successfully!');
        // Đóng modal sau khi tạo thành công
        setIsModalVisible(false);
        // Reset form
        form.resetFields();
        // Cập nhật lại danh sách người dùng
        fetchUser(currentPage, 10);
      } else {
        // Hiển thị thông báo lỗi
        toast.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      // Hiển thị thông báo lỗi
      toast.error('Error creating user');
    }
  };
  // Cấu hình các cột cho bảng
  const columns = [
    {
      title: 'FullName',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => (
        <Image
          src={avatar}
          width={100}
          onClick={() => {
            setPreviewImage(avatar);
            setPreviewOpen(true);
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Create User
      </Button>
      <Table
        dataSource={userList}
        columns={columns}
        rowKey={(record) => record.email} // Email làm key duy nhất
        pagination={{
          current: currentPage,   // Trang hiện tại
          pageSize: 10,            // Số lượng bản ghi mỗi trang
          total: total,           // Tổng số bản ghi
          onChange: handlePaginationChange, // Hàm xử lý thay đổi trang
        }}
      />

      {previewImage && (
        <Image
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}

      {/* Modal tạo người dùng */}
      <Modal
        title="Create User"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleCreateUser}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input the email!' }]}>
            <Input  />
          </Form.Item>

          <Form.Item
            label="Password"
            name="passWord"
            rules={[{ required: true, message: 'Please input the password!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: 'Please input the full name!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input the phone number!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Role"
            name="roleId"
            rules={[{ required: true, message: 'Please select a role!' }]}>
            <Select>
              {roleOptions.map(role => (
                <Select.Option key={role.value} value={role.value}>
                  {role.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create User
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* ToastContainer for displaying messages */}
      <ToastContainer />
    </div>
  );
}

export default ManageUser;
