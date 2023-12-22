import React from 'react';
import ReactDOM from 'react-dom/client';
// import './App.css';
import App from './App';
import { useEffect, useState } from 'react';
import Home from './Home';
import Personalities from './Personalities';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SignUpBar } from "./components/SignUpBar";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/App",
    element: <App/>
  },
  {
    path: "/Personalities",
    element: <Personalities/>
  },
]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);