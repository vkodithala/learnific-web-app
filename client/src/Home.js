import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import backgroundImage from './backgrounds/landingPage.png';
import logoImage from './logos/logo.png';
import heroImage from './logos/hero.png';
import { useStepperContext } from "./contexts/StepperContext.js";

const Home = () => {
  const { userData, setUserData } = useStepperContext();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
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
          <div class="flex items-center justify-center">
            <img src={ heroImage } alt="origin-mascot-img" class="hidden md:block justify-center mb-10" style={{ height: '250px', width: '275px' }} />
          </div>
            <div class="">
              <h1 class="font-bold text-5xl text-buttonColor mb-4">Unleash the Superpower of <span class="text-highlightColor">Knowledge</span></h1>
              <p class="text-xl leading-normal mb-4">Get your daily, ultra-personalized email newsletter, combining the latest in research, news, and social media</p>
              <div class="flex flex-col lg:flex-row gap-2 justify-center">
                <input type="text" class="border-2 rounded-xl border-slate-200 p-3" placeholder="johnny@appleseed.com"></input>
                <Link to="/app">
                  <button class="border-2 rounded-xl bg-buttonColor border-transparent text-slate-100 font-semibold p-3 hover:bg-inherit hover:border-buttonColor hover:text-buttonColor transition duration-500">Join Waitlist →</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
