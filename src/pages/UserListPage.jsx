/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://localhost:7217/api/Admin/view-all-users?pageIndex=${currentPage}&pageSize=20`
        );
        const data = await response.json();

        if (data.isSuccess) {
          setUsers(data.result);
          setTotalPages(data.result.totalPages);
        } else {
          throw new Error(data.message || "Failed to load users");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
        const response = await fetch(`https://localhost:7217/api/Admin/delete-user/${userId}`, {
            method: "PUT", // Đảm bảo dùng đúng phương thức DELETE
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();
        if (result.isSuccess) {
            alert("User deleted successfully.");
            setUsers(users.filter((user) => user.userId !== userId));
        } else {
            alert(result.message || "Failed to delete user.");
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user.");
    }
};


  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">User List</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/createuser")}
        >
          Create User
        </button>
      </div>

      {isLoading ? (
        <p className="text-center text-blue-500">Loading users...</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4">Avatar</th>
                <th className="p-4">Username</th>
                <th className="p-4">Email</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.userId || user.email} className="border-t hover:bg-blue-50">
                    <td className="p-4">
                      <img
                        src={user.avatar || "/default-avatar.png"}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full border"
                      />
                    </td>
                    <td className="p-4">{user.fullName || "N/A"}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4 flex gap-4">
                      <span
                        className="text-blue-500 hover:underline cursor-pointer"
                        onClick={() => navigate(`/user/${user.id}`)}
                      >
                        View
                      </span>
                      <span
                        className="text-red-500 hover:underline cursor-pointer"
                        onClick={() => handleDeleteUser(user.userId)}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-between items-center p-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListPage;
