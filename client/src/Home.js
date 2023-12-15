import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import './Home.css';

const Home = () => {
  return (
    <div className="container">
      <img
        src="/header2.png" // Replace with your image path
        alt="Descriptive Alt Text"
        style={{
          width: "100%", // Full width
          height: "auto", // Maintain aspect ratio
          marginBottom: "20px" // Space between image and header
        }}
      />
      <h1 style={{
        fontSize: "36px",
        fontWeight: "bold",
        color: "#004e7f",
        marginBottom: "20px",
        animation: "float 10s ease-in-out infinite"
      }}>The Research Digest</h1>
      <p style={{
        fontSize: "18px",
        color: "#555",
        marginBottom: "40px",

      }}>Your Daily Dose of Research Discoveries</p>

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
        <button style={{
          padding: "10px 20px",
          backgroundColor: "#ff6f60",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: "pointer"
        }}>Get Started →</button>
      </div>

    </div>
  );
};

export default Home;
