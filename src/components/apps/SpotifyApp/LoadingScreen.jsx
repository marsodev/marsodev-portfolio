import React from "react";
import "./SpotifyApp.css";

const LoadingScreen = ({ text = "Loading..." }) => {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  );
};

export default LoadingScreen;
