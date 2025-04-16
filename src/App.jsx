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
            <div className="hero-text">
              <h1 className="bounce-title">
                {"Welcome".split("").map((letter, i) => (
                  <span
                    key={i}
                    className="bounce-letter"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {letter}
                  </span>
                ))}
              </h1>
              <p>
                marsodev portfolio{" "}
                <img src={logo} alt="Marsodev Logo" className="inline-logo" />
              </p>
            </div>
          </div>

          <SlideToUnlock onUnlock={() => setIsUnlocked(true)} />
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
