import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import Home from './components/HomePage';
import { DashboardLayout } from './components/dashboard/DashBoard';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
