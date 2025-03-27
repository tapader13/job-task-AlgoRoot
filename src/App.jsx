import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello World</div>,
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
