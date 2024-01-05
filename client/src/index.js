import React from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';
import Home from './Home';
import Personalities from './Personalities';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Onboarding from './Onboarding';
import { StepperContextProvider } from './contexts/StepperContext'; // Import StepperContextProvider
import End from './End';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/App",
    element: <Onboarding/>
  },
  {
    path: "/Personalities",
    element: <Personalities/>
  },
  {
    path: "/end",
    element: <End/>
  },
]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StepperContextProvider> {/* Wrap RouterProvider with StepperContextProvider */}
      <RouterProvider router={router} />
    </StepperContextProvider>
  </React.StrictMode>
);
