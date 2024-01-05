import React from 'react';
import { Link } from 'react-router-dom';

// Import your images
import backgroundImage from './landingPage.png';
import logoImage from './logo.png';
import heroImage from './hero.png';

const EndPage = () => {
  const goldenTextStyle = {
    color: '#EAB323', // Golden text color
  };

  // The common style for both h1 and h2 tags
  const textStyle = {
    textAlign: 'center',
    fontFamily: 'Inter, sans-serif', // Include a fallback font
    fontSize: '55px', // Your specified font-size
    fontWeight: '700',
    lineHeight: 'normal',
    color: '#1D1C24', // Default text color
    // Omitted flex-shrink as it has no effect on non-flex items
    // Omitted width and height to allow text to size naturally
    margin: '0', // Reset default margins
    padding: '0.5rem 0', // Add some padding at top and bottom
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
      textAlign: 'center',
    }}>
      <img src={logoImage} alt="Logo" style={{ marginBottom: '2rem', height: '50px' }} />
      <div style={{ maxWidth: '1315px' }}> {/* Added a container to control text width */}
        <h1 style={textStyle}>
          Thank you, we will notify you when you can begin your 
          <span style={goldenTextStyle}> Origin Story of Knowledge, Discovery, and Curiosity</span>
        </h1>
      </div>
      <img src={heroImage} alt="Person at Computer" style={{ margin: '2rem', width: '20%' }} />
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button style={{
          padding: '1rem',
          fontSize: '1rem',
          backgroundColor: '#EAB323', // Example button color
          color: '#1D1C24', // Example text color for button
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '2rem'
        }}>
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default EndPage;
