import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../designs/UserProfilePage.css';
import { toast } from "react-toastify";

const UserProfile = () => {
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="p-4">
            <div className="text-sm text-gray-500">Username</div>
            <div className="font-medium text-lg">{userInfo.userName}</div>

            <div className="text-sm text-gray-500 mt-2">Full Name</div>
            <div className="font-medium">{userInfo.fullName}</div>

            <div className="text-sm text-gray-500 mt-2">Email</div>
            <div className="font-medium">{userInfo.email}</div>

            <div className="text-sm text-gray-500 mt-2">Phone</div>
            <div className="font-medium">{userInfo.phone}</div>
        </div>
    );
};

export default UserProfile;
