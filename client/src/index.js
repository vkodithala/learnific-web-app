import { useEffect, useState } from 'react';
import Home from './Home'
import OnboardingPage from './Onboarding';

import 'bootstrap/dist/css/bootstrap.min.css';
import { SignUpBar } from "./components/SignUpBar";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <App />
  </React.StrictMode>
);