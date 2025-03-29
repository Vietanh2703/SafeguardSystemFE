import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm dòng này
import axios from 'axios';
import BusinessSideBar from '../../components/sidebar/BusinessSideBar';
import NavBar from '../../components/NavBar';

const ViewReport = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeMenu, setActiveMenu] = useState();

    const navigate = useNavigate(); // Thêm dòng này

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('https://localhost:7217/reports');
                if (response.data.isSuccess) {
                    setReports(response.data.result);
                } else {
                    console.error('Failed to fetch reports:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching reports:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const handleMenuClick = (menu) => {
        setLoading(true); 
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

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
            <NavBar
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                activeMenuLabel="Report"
            />

            <div className="flex flex-1">
                <BusinessSideBar
                    isSidebarOpen={isSidebarOpen}
                    setActiveMenu={handleMenuClick}
                    activeMenu={activeMenu}
                />

                <div className="p-8 min-h-screen bg-gradient-to-r from-green-200 to-green-200 mt-26 ml-64 w-500">
                    <div className="flex-1 p-8 bg-white w-full">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">List Reports</h1>

                        {loading ? (
                            <p>Loading reports...</p>
                        ) : reports.length === 0 ? (
                            <p>No reports available.</p>
                        ) : (
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 p-2">Sender</th>
                                        <th className="border border-gray-300 p-2">Report Comment</th>
                                        <th className="border border-gray-300 p-2">Image URL</th>
                                        <th className="border border-gray-300 p-2">Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reports.map((report) => (
                                        <tr key={report.ReportId} className="hover:bg-gray-100">
                                            <td className="border border-gray-300 p-2">{report.sender || 'N/A'}</td>
                                            <td className="border border-gray-300 p-2">{report.reportComment || 'N/A'}</td>
                                            <td className="border border-gray-300 p-2">{report.imageUrl || 'None'}</td>
                                            <td className="border border-gray-300 p-2">
                                                {report.createdAt 
                                                    ? new Date(report.createdAt).toLocaleString() 
                                                    : 'N/A'}
                                            </td>
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

export default ViewReport;
