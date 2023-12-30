import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import styles from './new.module.css'; // Import CSS module
import backgroundImage from './landdingPage.png';
const Home = () => {
  return (
    <div style={{backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',}}>
      <img
          src="./logo2.png" // Replace with your image path
          alt="Descriptive Alt Text"
          style={{
          width: "auto", // Adjust the width as needed
          height: "60%", // Maintain aspect ratio
      }}/>
      <p style={{
        fontSize: "18px",
        color: "#555",
        marginBottom: "40px",

      }}>Get your daily ultra-personalized email newsletter, combining the latest in research, news, and social media</p>

      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Enter Your Email"
          style={{
            marginRight: "10px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "16px"
          }}
        />
        <Link to="/App">
        <button style={{
          padding: "10px 20px",
          backgroundColor: "#ff6f60",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: "pointer"
        }}>Get Started →</button>
        </Link>
      </div>

    </div>
  );
};

export default Home;
