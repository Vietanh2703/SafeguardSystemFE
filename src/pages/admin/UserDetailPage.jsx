/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSideBar from '../../components/sidebar/AdminSideBar';
import NavBar from '../../components/NavBar';



const UserDetailPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeMenu, setActiveMenu] = useState();
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `https://localhost:7217/user/${userId}`
        );
        const data = await response.json();

        if (data.isSuccess) {
          setUser(data.result);
        } else {
          setError(data.message || "Failed to load user details.");
        }
      } catch (error) {
        setError("Error fetching user details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) fetchUserDetails();
  }, [userId]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
};

  if (isLoading) return <p className="text-center text-blue-500">Loading user details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
   
   <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
    <NavBar 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        activeMenuLabel="Shift Schedule" 
    />
    
    <div className="flex flex-1">
        <AdminSideBar
            isSidebarOpen={isSidebarOpen}
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
        />

    <div className="p-8 bg-white-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-4xl mt-20 ml-130">
        {user && (
          <>
            <div className="flex items-center gap-8 mb-8 border-b pb-6">
              <img
                src={user.avatar || "/default-avatar.png"}
                alt="User Avatar"
                className="w-28 h-28 rounded-full border-4 border-blue-500"
              />
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{user.fullName}</h2>
                
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-6 text-lg">
              <p><strong>Username:</strong> {user.userName}</p>
        
              <p><strong>Identity Number:</strong> {user.identityNumber}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Working Contract:</strong> {user.workingContract}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Birthday:</strong> {new Date(user.birthDay).toLocaleDateString()}</p>
            </div>

            <div className="mt-8 text-center">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md"
                onClick={() => navigate(-1)}
              >
                Back to User List
              </button>
            </div>
          </>
        )}
      </div>
    </div>
    </div>
    </div>
  );
};

export default UserDetailPage;