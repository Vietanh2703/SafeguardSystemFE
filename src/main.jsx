
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminDashboard from './pages/dashboard/index.jsx';
import LoginPage from './pages/login/index.jsx';
<<<<<<< Updated upstream
import MaintenancePage from './pages/maintenance/index.jsx';
=======
import SecurityGuard from './pages/securityguard/index.jsx';
import BusinessPartner from './pages/businesspartner/index.jsx';
import SecurityManager from './pages/securitymanager/index.jsx';
import ViewRole from './pages/viewRole/index.jsx';

>>>>>>> Stashed changes

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage/>,
  },


  {
    path: "/dashboard",
    element: <AdminDashboard/>,
  },

  {
    path: "/maintenance",
    element: <MaintenancePage/>,
  },
<<<<<<< Updated upstream
=======

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


>>>>>>> Stashed changes
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
 
)
