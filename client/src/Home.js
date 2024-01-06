import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import backgroundImage from './landingPage.png';
import logoImage from './logo.png'; // Add your actual logo image path here
import heroImage from './hero.png'; // Add your actual hero image path here
import { useStepperContext } from "./contexts/StepperContext.js";

const Home = () => {
  const headingStyle = {
    textAlign: 'center',
    fontFamily: 'Inter, sans-serif', // Include a fallback font
    fontSize: '3.5vw',
    fontWeight: '700',
    lineHeight: 'normal',
    color: '#1D1C24', // Default text color
    flexWrap: 'wrap', // Added line
    minWidth: '20px', // You may need to adjust this for responsiveness
    
  };

  const { userData, setUserData } = useStepperContext();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Add a style object for the highlighted word
  const highlightStyle = {
    color: '#DAB043', // Golden color for the word "Knowledge"
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
        <img src={logoImage} alt="Logo" style={{ height: '50px' }} />
      </header>

      {/* Main Content Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        maxWidth: '1200px',
        '@media (max-width: 600px)': { // Adjusted for mobile phones specifically
          flexDirection: 'column',
          alignItems: 'stretch',
        }
      }}>
        {/* Hero Image for Mobile Phones */}
        <img src={heroImage} alt="Superhero" style={{
          width: '100%', 
          height: 'auto', 
          display: 'none', // Hide by default
          '@media (max-width: 600px)': {
            display: 'block', // Show only on mobile phones
            order: -1, // Put it on top
          }
        }} />

        {/* Text and Form Container */}
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
          <h1 class="font-bold text-5xl text-buttonColor mb-4">Unleash the Superpower of <span class="text-highlightColor">Knowledge</span></h1>
          <p class="text-xl leading-normal mb-4">Get your daily, ultra-personalized email newsletter, combining the latest in research, news, and social media</p>
          <div class="flex flex-row md:flex-col gap-2">
            <input type="text" class="border-2 rounded-xl border-slate-200 p-3" placeholder="johnny@appleseed.com"></input>
            <Link to="/app">
              <button class="border-2 rounded-xl bg-buttonColor border-transparent text-slate-100 font-semibold p-3 hover:bg-inherit hover:border-buttonColor hover:text-buttonColor transition duration-500">Join Waitlist →</button>
            </Link>
          </div>
        </div>
        
         {/*Hero Image */}
        <img src={heroImage} alt="Superhero" style={{ flex: 1, width: '50%', height: 'auto', marginLeft: '100px',
      '@media (max-width: 768px)': {
        marginLeft: '0', // Remove margin on small screens
      }
      
    }} />
   
      </div>
    </div>
  );
};

export default Home;
