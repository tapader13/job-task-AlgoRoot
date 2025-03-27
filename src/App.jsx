import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import Home from './components/HomePage';
import DashboardPage from './components/dashboard/DashBoard';
import AuthProvider from './context/AuthContext';
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
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
