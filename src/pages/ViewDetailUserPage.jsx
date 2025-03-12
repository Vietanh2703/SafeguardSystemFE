/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewDetailUserPage = () => {
  const { email } = useParams(); // 📩 Nhận email từ URL
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `https://localhost:7217/api/Admin/view-user-by-email?email=${email}`
        );
        const data = await response.json();

        if (data.isSuccess) {
          setUser(data.result);
        } else {
          throw new Error(data.message || "User not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (email) {
      fetchUserDetails();
    } else {
      setError("Invalid email address.");
      setIsLoading(false);
    }
  }, [email]);

  if (isLoading) return <p className="text-center text-blue-500">Loading user details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8 bg-white shadow-md rounded-lg max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">User Details</h1>

      {user && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <img
              src={user.avatar || "/default-avatar.png"}
              alt="User Avatar"
              className="w-32 h-32 rounded-full border"
            />
          </div>

          <div>
            <p><strong>Identity Number:</strong> {user.identityNumber || "N/A"}</p>
            <p><strong>Username:</strong> {user.userName || "N/A"}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Full Name:</strong> {user.fullName || "N/A"}</p>
            <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
            <p><strong>Address:</strong> {user.address || "N/A"}</p>
            <p><strong>Gender:</strong> {user.gender || "N/A"}</p>
            <p><strong>Working Contract:</strong> {user.workingContract || "N/A"}</p>
            <p><strong>BirthDay:</strong> {user.birthDay || "N/A"}</p>
          </div>
        </div>
      )}

      <div className="mt-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/users")}
        >
          Back to Users List
        </button>
      </div>
    </div>
  );
};

export default ViewDetailUserPage;
