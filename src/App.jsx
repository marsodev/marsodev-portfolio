import React, { useState, useEffect, useMemo } from "react";
import {
  faGear,
  faEnvelope,
  faFolderOpen,
  faUserGear,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faSpotify } from "@fortawesome/free-brands-svg-icons";
import Wallpaper from "./components/Wallpaper/Wallpaper";
import SlideToUnlock from "./components/SlideToUnlock/SlideToUnlock";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import { appRoutes } from "./routes";
import logoLight from "./assets/images/logo-light.png";
import logoDark from "./assets/images/logo-dark.png";
import tapSound from "./assets/sound/tap.mp3";
import "./styles/reset.css";
import "./styles/app.css";

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [openedApp, setOpenedApp] = useState(null);

  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [isSoundOn, setIsSoundOn] = useState(
    () => localStorage.getItem("sound") !== "off"
  );
  const [isAnimationPaused, setIsAnimationPaused] = useState(
    () => localStorage.getItem("animationPaused") === "true"
  );

  const tapAudio = useMemo(() => new Audio(tapSound), []);

  const saveToLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    document.body.className = isDark ? "dark-mode" : "light-mode";
    saveToLocalStorage("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    saveToLocalStorage("sound", isSoundOn ? "on" : "off");
  }, [isSoundOn]);

  useEffect(() => {
    saveToLocalStorage("animationPaused", isAnimationPaused ? "true" : "false");
  }, [isAnimationPaused]);

  const playSound = () => {
    if (!isSoundOn) return;
    tapAudio.currentTime = 0;
    tapAudio.play();
  };

  const apps = [
    { name: "Settings", icon: faGear, id: "settings" },
    { name: "Contact", icon: faEnvelope, id: "contact" },
    { name: "Projects", icon: faFolderOpen, id: "projects" },
    { name: "Skills", icon: faUserGear, id: "skills" },
    { name: "GitHub", icon: faGithub, id: "github" },
    { name: "Spotify", icon: faSpotify, id: "spotify" },
    { name: "Calendev", icon: faCode, id: "calendev" },
  ];

  const handleOpenApp = (app) => {
    playSound();
    setOpenedApp(app);
  };

  const renderApp = () => {
    if (!openedApp) return null;

    const AppComponent = appRoutes[openedApp.id];
    if (!AppComponent) return null;

    const appProps = { onBackHome: () => setOpenedApp(null) };

    if (openedApp.id === "settings") {
      return (
        <AppComponent
          {...appProps}
          isDark={isDark}
          toggleTheme={() => setIsDark((prev) => !prev)}
          isSoundOn={isSoundOn}
          toggleSound={() => setIsSoundOn((prev) => !prev)}
          isAnimationPaused={isAnimationPaused}
          toggleAnimation={() => setIsAnimationPaused((prev) => !prev)}
        />
      );
    }

    return <AppComponent {...appProps} />;
  };

  return (
    <div className="App">
      <Wallpaper isPaused={isAnimationPaused} />
      {!isUnlocked ? (
        <div className="hero">
          <div className="hero-content">
            <div className="hero-text fade-block">
              <h1>Welcome</h1>
              <p>
                marsodev portfolio{" "}
                <img
                  src={isDark ? logoLight : logoDark}
                  alt="Marsodev logo"
                  className="inline-logo"
                  role="img"
                />
              </p>
            </div>
          </div>
          <SlideToUnlock
            onUnlock={() => setIsUnlocked(true)}
            className="fade-block"
          />
        </div>
      ) : (
        <div className="home-screen-wrapper">
          <div className="device-screen fade-block">
            {!openedApp ? (
              <HomeScreen
                apps={apps}
                onOpenApp={handleOpenApp}
                isDark={isDark}
                onBackToLanding={() => setIsUnlocked(false)}
              />
            ) : (
              <div className="app-opened">{renderApp()}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
