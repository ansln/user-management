import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'

const Home = lazy(() => import('./Components/DataSiswaComponents'));
const AddSiswa = lazy(() => import('./Components/AddSiswaComponents'));
const UpdateSiswa = lazy(() => import('./Components/UpdateSiswaComponents'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
    // errorElement: 'something error'
  },
  {
    path: "/add",
    element: <AddSiswa />,
    errorElement: 'something error'
  },
  {
    path: "/update/:id",
    element: <UpdateSiswa />,
    errorElement: 'something error'
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)