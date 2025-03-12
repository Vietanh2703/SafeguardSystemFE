import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/admin/AdminDashboardPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import BusinessPartner from './pages/BusinessPage.jsx';
import Manager from './pages/ManagerPage.jsx';
import ChangePassword from "./pages/ChangePasswordPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/UserProfilePage.jsx";
import Error from "./pages/ErrorPage.jsx";
import withLoading from './components/WithLoading.jsx';
import { ToastContainer } from "react-toastify";
import api from "./utils/api.js";
import {useEffect} from "react";

import AdminHomePage from "./pages/admin/AdminHomePage.jsx";
import UserListPage from './pages/admin/UserListPage.jsx';
import CreateUserPage from './pages/admin/CreateUserPage.jsx';
import UserDetailPage from './pages/UserDetailPage.jsx';
import BusinessPartnersPage from './pages/admin/viewbusinesspartner.jsx';
import ShiftSchedulePage from './pages/admin/ShiftSchedulePage.jsx';
import LocationPage from './pages/admin/viewlocation.jsx';
import CreateLocation from './pages/admin/CreateLocation.jsx';



const HomePageWithLoading = withLoading(HomePage);
const LoginPageWithLoading = withLoading(LoginPage);
const ProfilePageWithLoading = withLoading(ProfilePage);
const ErrorWithLoading = withLoading(Error);
const ChangePasswordWithLoading = withLoading(ChangePassword);
const AdminHomeWithLoading = withLoading(AdminHomePage);
const BusinessPartnerWithLoading = withLoading(BusinessPartner);
const ManagerWithLoading = withLoading(Manager);



function App() {
    console.log("App component rendered");
    useEffect(() => {
        api.get('/user')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <Router>
            <div>
                <ToastContainer position="top-right" autoClose={3000} />
                <Routes>
                    <Route path="/" element={<HomePageWithLoading />} />
                    <Route path="/login" element={<LoginPageWithLoading />} />
                    <Route path="/error" element={<ErrorWithLoading />} />
                    <Route path="/login/change-password" element={<ChangePasswordWithLoading />} />
                    <Route path="/admin" element={<AdminHomeWithLoading />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/businesspartner" element={<BusinessPartnerWithLoading />} />
                    <Route path="/Schedule" element={<ShiftSchedulePage />} />
                    <Route path="/viewbusinesspartner" element={<BusinessPartnersPage />} />  
                    <Route path="/location" element={<LocationPage />} />         
                    <Route path="/create-location" element={<CreateLocation />} />       
                    <Route path="/manager" element={<ManagerWithLoading />} />
                    <Route path="/admin/users" element={<UserListPage />} />
                    <Route path="/user/:userId" element={<ProfilePageWithLoading />} />
                    <Route path="/createuser" element={<CreateUserPage />} /> 
                    <Route path="/profile/:userId" element={<UserDetailPage />} />
                
                </Routes>
            </div>
        </Router>
    );
}

export default App;
