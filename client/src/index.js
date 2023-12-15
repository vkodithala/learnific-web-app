import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import { useEffect, useState } from 'react';
import Home from './Home'
import OnboardingPage from './Onboarding';
import Personalities from './Personalities';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);