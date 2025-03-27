import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import Home from './components/HomePage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
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
