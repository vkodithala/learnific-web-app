import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Home = () => {
  return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: "36px",
          fontWeight: "bold",
          color: "#007bff",
          marginBottom: "20px"
        }}>The Research Digest</h1>
        <p style={{
          fontSize: "18px",
          color: "#555",
          marginBottom: "40px"
        }}>Your Daily Dose of Research Discoveries</p>
          <button style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer"
          }}>Start Onboarding →</button>
      </div>
  );
};

export default Home;
