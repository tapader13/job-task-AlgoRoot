import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import Home from './components/HomePage';
import DashboardPage from './components/dashboard/DashBoard';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
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
