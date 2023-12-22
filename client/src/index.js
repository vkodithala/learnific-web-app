import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import { useEffect, useState } from 'react';
import Home from './Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SignUpBar } from "./components/SignUpBar";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);