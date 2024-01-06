import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import backgroundImage from './landingPage.png';
import logoImage from './logo.png'; // Add your actual logo image path here

const Home = () => {
  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <header style={{
        position: 'absolute',
        top: 0,
        width: '100%',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Link to="/">
          <img src={logoImage} alt="Logo" style={{ height: '50px' }} />
        </Link>
      </header>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        maxWidth: '1200px',
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          '@media (max-width: 600px)': {
            marginBottom: '20px',
          }
        }}>
          <div class="flex justify-between flex-col gap-2">
            <div class="">
              <h1 class="font-bold text-5xl text-buttonColor mb-4"><span class="text-highlightColor">You're in!</span> We'll let you know when we launch our private beta.</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
