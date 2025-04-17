import React, { useState, useEffect } from "react";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import SlideToUnlock from "./components/SlideToUnlock/SlideToUnlock";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import SettingsApp from "./components/apps/SettingsApp/SettingsApp";
import logoLight from "./assets/images/logo-light.png";
import logoDark from "./assets/images/logo-dark.png";

import "./styles/reset.css";
import "./styles/app.css";

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [openedApp, setOpenedApp] = useState(null);
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });
  const [isSoundOn, setIsSoundOn] = useState(() => {
    const savedSound = localStorage.getItem("sound");
    return savedSound ? savedSound === "on" : true;
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    document.body.className = isDark ? "dark-mode" : "light-mode";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("sound", isSoundOn ? "on" : "off");
  }, [isSoundOn]);

  const playSound = (audioUrl) => {
    if (!isSoundOn) return;

    const audio = new Audio(audioUrl);
    audio.play();
  };

  const apps = [
    { name: "Settings", icon: faGear, id: "settings" },
    { name: "Settings", icon: faGear, id: "settings-2" },
  ];
  return (
    <div className="App">
      {!isUnlocked ? (
        <div className="hero">
          <div className="hero-content">
            <div className="hero-text fade-block">
              <h1>Welcome</h1>
              <p>
                marsodev portfolio{" "}
                <img
                  src={isDark ? logoLight : logoDark}
                  alt="Logo"
                  className="inline-logo"
                />
              </p>
            </div>
          </div>
          <SlideToUnlock
            onUnlock={() => setIsUnlocked(true)}
            className="fade-slider"
          />
        </div>
      ) : (
        <div className="home-screen-wrapper">
          <div className="device-screen">
            {!openedApp ? (
              <HomeScreen
                apps={apps}
                onOpenApp={(app) => setOpenedApp(app)}
                isDark={isDark}
                onBackToLanding={() => setIsUnlocked(false)}
              />
            ) : (
              <div key={isDark} className="app-opened">
                {openedApp.id === "settings" && (
                  <SettingsApp
                    isDark={isDark}
                    toggleTheme={() => setIsDark((prev) => !prev)}
                    isSoundOn={isSoundOn}
                    toggleSound={() => setIsSoundOn((prev) => !prev)}
                    onBackHome={() => setOpenedApp(null)}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
