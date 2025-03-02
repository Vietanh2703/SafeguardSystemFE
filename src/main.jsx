
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminDashboard from './pages/dashboard/index.jsx';
import LoginPage from './pages/login/index.jsx';
import MaintenancePage from './pages/maintenance/index.jsx';

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
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
 
)
