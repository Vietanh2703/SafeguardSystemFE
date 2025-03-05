
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LoginPage from './pages/login/index.jsx';
import MaintenancePage from './pages/maintenance/index.jsx';
import BusinessPartner from './pages/businesspartner/index.jsx';
import SecurityManager from './pages/securitymanager/index.jsx';
import ViewRole from './pages/viewRole/index.jsx';
import AdminDashboard from './component/dashboard/index.jsx';
import ManageUser from './pages/admin/manageuser/index.jsx';
import HomePage from './pages/home/index.jsx';


const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage/>,
  },


  {
    path: "/dashboard",
    element: <AdminDashboard/>,
    children:[
      {
        path:"manage-user",
        element:<ManageUser/>
      }
    ]
  },

  {
    path: "/maintenance",
    element: <MaintenancePage/>,
  },

  {
    path: "/businesspartner",
    element: <BusinessPartner/>,
  },

  {
    path: "/securitymanager",
    element: <SecurityManager/>,
  },

  {
    path: "/viewrole",
    element: <ViewRole/>,
  },

  {
    path: "/",
    element: <HomePage/>,
  },


]);
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
 
)
