/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../designs/UserProfilePage.css';
import { toast } from "react-toastify";
import { FaEdit, FaSave } from 'react-icons/fa';

const UserProfile = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        identityNumber: '',
        userName: '',
        email: '',
        fullName: '',
        avatar: '',
        phone: '',
        address: '',
        gender: '',
        workingContract: '',
        birthDay: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState({
        phone: false,
        address: false,
        gender: false,
        workingContract: false,
        birthDay: false,
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    setError("User ID not found. Please log in again.");
                    setLoading(false);
                    return;
                }

                const token = localStorage.getItem("accessToken");
                if (!token) {
                    setError("Authentication token missing.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`https://localhost:7217/get-user-details/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUserInfo(response.data);
            } catch (error) {
                console.error("Error fetching user info:", error);
                setError(error.response?.data?.message || "Error fetching user info");
                toast.error(error.response?.data?.message || "Error fetching user info");
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    const handleEditClick = (field) => {
        setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, result: { ...prev.result, [name]: value } }));
    };

    const handleSaveClick = async (field) => {
        try {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("accessToken");

            await axios.put(`https://localhost:7217/update-user/${userId}`, {
                [field]: userInfo.result[field]
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("Information updated successfully");
            setEditMode((prev) => ({ ...prev, [field]: false }));
        } catch (error) {
            console.error("Error updating user info:", error);
            toast.error("Error updating user info");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <img src={userInfo.result.avatar} alt="User Avatar" className="profile-avatar" />
                    <div className="profile-info">
                        <h1 className="username">{userInfo.result.fullName}</h1>
                        <p className="bio">{userInfo.result.userName}</p>
                    </div>
                </div>
                <div className="profile-content">
                    <div className="profile-details">
                        <div className="profile-column">
                            {['phone', 'address', 'gender'].map((field) => (
                                <div className="profile-box" key={field}>
                                    {editMode[field] ? (
                                        <input
                                            type="text"
                                            name={field}
                                            value={userInfo.result[field]}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <>
                                            <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>
                                            {userInfo.result[field]}
                                        </>
                                    )}
                                    <button onClick={() => handleEditClick(field)}>
                                        {editMode[field] ? <FaSave onClick={() => handleSaveClick(field)} /> : <FaEdit />}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="profile-column">
                            {['workingContract', 'birthDay'].map((field) => (
                                <div className="profile-box" key={field}>
                                    {editMode[field] ? (
                                        field === 'birthDay' ? (
                                            <input
                                                type="date"
                                                name={field}
                                                value={userInfo.result[field].split('T')[0]}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                name={field}
                                                value={userInfo.result[field]}
                                                onChange={handleInputChange}
                                            />
                                        )
                                    ) : (
                                        <>
                                            <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>
                                            {field === 'birthDay' ? new Date(userInfo.result[field]).toLocaleDateString('en-GB') : userInfo.result[field] || "No information"}
                                        </>
                                    )}
                                    <button onClick={() => handleEditClick(field)}>
                                        {editMode[field] ? <FaSave onClick={() => handleSaveClick(field)} /> : <FaEdit />}
                                    </button>
                                </div>
                            ))}
                            <div className="profile-box identity-number">
                                <strong>Identity Number:</strong>
                                {userInfo.result.identityNumber || "No information"}
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={() => navigate(-1)} className="back-button">Close</button>
            </div>
        </div>
    );
};

export default UserProfile;