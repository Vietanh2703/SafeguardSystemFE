
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminDashboard from './pages/dashboard/index.jsx';
import LoginPage from './pages/login/index.jsx';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage/>,
  },


  {
    path: "/dashboard",
    element: <AdminDashboard/>,
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
 
)
