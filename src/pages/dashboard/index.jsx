
import { useState } from "react";
import { FiHome, FiUsers, FiPieChart, FiSettings, FiUser, FiBell, FiMenu, FiLogOut } from "react-icons/fi";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [notifications] = useState(3);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: FiHome },
    { id: "users", label: "User Management", icon: FiUsers },
    { id: "analytics", label: "Analytics", icon: FiPieChart },
    { id: "settings", label: "Settings", icon: FiSettings },
    { id: "profile", label: "Profile", icon: FiUser }
  ];

  const renderContent = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-md">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FiUser className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">User Action {item}</p>
                  <p className="text-sm text-gray-500">{item} hour ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-blue-600">1,234</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-green-600">892</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">New Users</p>
              <p className="text-2xl font-bold text-purple-600">45</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-600">Reports</p>
              <p className="text-2xl font-bold text-yellow-600">28</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Generate Report
            </button>
            <button className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Add New User
            </button>
            <button className="w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
              Update Settings
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <img
            src="https://images.unsplash.com/photo-1517230878791-4d28214057c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=80"
            alt="Logo"
            className="h-8 w-8 rounded"
          />
          {isSidebarOpen && <span className="font-semibold text-xl">Admin</span>}
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center p-4 hover:bg-gray-100 transition-colors ${activeMenu === item.id ? "bg-blue-50 text-blue-600" : "text-gray-600"}`}
              aria-label={item.label}
            >
              <item.icon className="h-5 w-5" />
              {isSidebarOpen && (
                <span className="ml-4 font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-label="Toggle Sidebar"
            >
              <FiMenu className="h-6 w-6 text-gray-600" />
            </button>

            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 relative"
                aria-label="Notifications"
              >
                <FiBell className="h-6 w-6 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              <div className="flex items-center space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=32&q=80"
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
                {isSidebarOpen && (
                  <span className="font-medium text-gray-700">John Doe</span>
                )}
              </div>

              <button
                className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-label="Logout"
              >
                <FiLogOut className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;