import React from "react";

const LoadingScreen = ({ text }) => {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  );
};

export default LoadingScreen;
