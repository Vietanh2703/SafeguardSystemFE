import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BusinessSideBar from '../../components/sidebar/BusinessSideBar';
import NavBar from '../../components/NavBar';

const ViewShift = () => {
    const [shifts, setShifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeMenu, setActiveMenu] = useState();

    const navigate = useNavigate();
   

    useEffect(() => {
        const fetchShifts = async () => {
            try {
                const response = await axios.get('https://localhost:7217/shifts');
                if (response.data.isSuccess) {
                    setShifts(response.data.result);
                } else {
                    console.error('Failed to fetch shifts:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching shifts:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchShifts();
    }, []);

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        switch (menu) {
            case 'dashboard':
                navigate('/businesspartner');
                break;
            case 'viewshift':
                navigate('/viewshift');
                break;
            case 'checkpoint':
                navigate('/checkpoint');
                break;
            case 'report':
                navigate('/viewreport');
                break;
            default:
                navigate('/businesspartner');
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
            <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} activeMenuLabel="View Shift" />
            <div className="flex flex-1">
                <BusinessSideBar isSidebarOpen={isSidebarOpen} setActiveMenu={handleMenuClick} activeMenu={activeMenu} />
                <div className="p-8 min-h-screen bg-gradient-to-r from-green-200 to-green-200 mt-26 ml-64 w-500">

              
    <div className="flex-1 p-8 bg-white w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Shift List</h1>

        {loading ? (
            <p>Loading shifts...</p>
        ) : shifts.length === 0 ? (
            <p>No shifts available.</p>
        ) : (
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">Location Name</th>
                        <th className="border border-gray-300 p-2">Team Name</th>
                        <th className="border border-gray-300 p-2">Shift Type</th>
                        <th className="border border-gray-300 p-2">Shift Date</th>
                        <th className="border border-gray-300 p-2">Start Time</th>
                        <th className="border border-gray-300 p-2">End Time</th>
                    </tr>
                </thead>
                <tbody>
                    {shifts.map((shift, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{shift.locationName}</td>
                            <td className="border border-gray-300 p-2">{shift.teamName}</td>
                            <td className="border border-gray-300 p-2">{shift.typeName}</td>
                            <td className="border border-gray-300 p-2">{shift.shiftDate}</td>
                            <td className="border border-gray-300 p-2">{shift.startTime}</td>
                            <td className="border border-gray-300 p-2">{shift.endTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
</div>

            </div>
        </div>
    );
};

export default ViewShift;
