import '../../designs/BusinessPage.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BusinessPartnersPage = () => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://localhost:7217/api/Admin/view-all-business-partners')
            .then(response => {
                if (response.data.isSuccess) {
                    setPartners(response.data.result);
                }
            })
            .catch(error => console.error('Error fetching data:', error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="p-4 grid gap-4">
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
            </div>
        );
    }

    return (
        <div className="p-8 min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
            <h1 className="text-3xl font-bold text-black-700 mb-6">Business Partner List</h1>
            {partners.length === 0 ? (
                <p className="text-center text-gray-500">No Business Partner List Found.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {partners.map(partner => (
                        <div key={partner.businessId} className="bg-white shadow-md rounded-xl p-6 border border-blue-200">
                            <h2 className="text-xl font-semibold text-black-600 mb-2">{partner.name}</h2>
                            <p className="text-gray-700 mb-2">{partner.description}</p>
                            <p className="text-sm text-gray-500 mb-1">
                               Contract Expiry: {new Date(partner.contractExpiry).toLocaleDateString("vi-VN")}
                            </p>
                            <p className={`text-sm font-medium ${partner.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                {partner.isActive ? 'Is Activating' : 'Is Stopping'}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BusinessPartnersPage;