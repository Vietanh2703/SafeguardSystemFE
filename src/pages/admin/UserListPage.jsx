import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar.jsx";
import AdminSideBar from "../../components/sidebar/AdminSideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../designs/UserListPage.css";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeMenu, setActiveMenu] = useState('user');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
            `https://localhost:7217/api/Admin/view-all-users?pageIndex=${currentPage}&pageSize=5`
        );
        const data = await response.json();

        if (data.isSuccess && data.result?.users) {
          setUsers(data.result.users);
          setTotalPages(data.result.totalPages);
        } else {
          throw new Error(data.message || "Failed to load users");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`https://localhost:7217/api/Admin/delete-user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
        <ToastContainer />
        <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} activeMenuLabel="User" />
        <div className="flex flex-1">
          <AdminSideBar
              isSidebarOpen={isSidebarOpen}
              setActiveMenu={setActiveMenu}
              activeMenu={activeMenu}
          />
          <div className="flex-1 p-4 bg-gray-100 content-container">
            {isLoading ? (
                <div className="loading-spinner" />
            ) : (
                <div className="bg-gray-100 rounded-lg overflow-hidden p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-extrabold text-gray-800">User List</h1>
                    <button
                        className="bg-color hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow"
                        onClick={() => navigate("/createuser")}
                    >
                      Create User
                    </button>
                  </div>

                  <div className="bg-gray-100 rounded-lg overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                      <tr className="bg-color text-white">
                        <th className="p-2">Avatar</th>
                        <th className="p-2">Full Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                      {users.length > 0 ? (
                          users.map((user) => (
                              <tr key={user.userId} className="border-t hover:bg-blue-50">
                                <td className="p-2">
                                  <img
                                      src={user.avatar || "/default-avatar.png"}
                                      alt="User Avatar"
                                      className="w-8 h-8 rounded-full border"
                                  />
                                </td>
                                <td className="p-2">{user.fullName || "N/A"}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2 flex gap-2">
                            <span
                                className="text-blue-500 hover:underline cursor-pointer"
                                onClick={() => navigate(`/userdetail/${user.userId}`)}
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
                            <td colSpan="4" className="text-center p-2">
                              No users found.
                            </td>
                          </tr>
                      )}
                      </tbody>
                    </table>

                    <div className="flex justify-between items-center p-2 bg-gray-100">
                      <button
                          className="bg-color text-white px-3 py-1 rounded disabled:opacity-50"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                      >
                        Previous
                      </button>

                      <span>
                    Page {currentPage} of {totalPages}
                  </span>

                      <button
                          className="bg-color text-white px-3 py-1 rounded disabled:opacity-50"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                        type="button"
                        className="bg-color text-white px-4 py-2 rounded mr-2"
                        onClick={() => navigate("/admin")}
                    >
                      Go Back
                    </button>
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default UserListPage;