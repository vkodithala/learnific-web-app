import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
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
        <span style={{ backgroundColor: '#FFF', padding: '0.5rem 1rem', borderRadius: '20px' }}>Beta Testing</span>
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
          <h1 style={headingStyle}>
            Unleash Your Superpower of <span style={highlightStyle}>Knowledge</span>
          </h1>
          <p style={{
            fontFamily: 'Inter, sans-serif', // Include a fallback font
            fontSize: '1.2vw',
            fontWeight: '400',
            lineHeight: 'normal',
            color: '#1D1C24', // Default text color
            width: '699px', // You may need to adjust this for responsiveness
            flexWrap: 'wrap', // Added line

        
          }}>Get your daily ultra-personalized email newsletter, combining the latest in research, news, and social media</p>
          <div style={{ display: 'flex', marginTop: '2rem' }}>
            <input
              type="text"
              placeholder="Your email address"
              onChange={handleChange}
              value={userData["email"] || ""}
              name="email"
              style={{
                marginRight: '1rem',
                padding: '1rem',
                border: '2px solid #ddd',
                borderRadius: '30px',
                fontSize: '1rem',
                outline: 'none',
                width: '300px', // adjust as needed
              }}
            />
            <Link to="/app">
              <button style={{
                padding: '1rem 2rem',
                backgroundColor: '#334D52',
                color: '#FFF',
                border: 'none',
                borderRadius: '30px',
                fontSize: '1rem',
                cursor: 'pointer',
              }}>Join Waitlist →</button>
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
