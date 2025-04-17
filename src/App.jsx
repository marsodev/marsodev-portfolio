import React, { useState, useEffect } from "react";
import SlideToUnlock from "./components/SlideToUnlock/SlideToUnlock";
import logo from "./assets/images/logo.png";
import "./styles/reset.css";
import "./styles/app.css";

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isUnlocked ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isUnlocked]);

  return (
    <div className="App">
      {!isUnlocked ? (
        <div className="hero">
          <div className="hero-content">
            <div className="hero-text fade-block">
              <h1>Welcome</h1>
              <p>
                marsodev portfolio{" "}
                <img src={logo} alt="Marsodev Logo" className="inline-logo" />
              </p>
            </div>
          </div>

          <SlideToUnlock
            onUnlock={() => setIsUnlocked(true)}
            className="fade-slider"
          />
        </div>
      ) : (
        <div className="home">
          <h1>Bienvenue 🚀</h1>
        </div>
      )}
    </div>
  );
}

export default App;
