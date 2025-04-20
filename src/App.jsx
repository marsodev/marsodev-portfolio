import React, { useState, useEffect } from "react";
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
import SettingsApp from "./components/apps/SettingsApp/SettingsApp";
import ContactApp from "./components/apps/ContactApp/ContactApp";
import ProjectsApp from "./components/apps/ProjectsApp/ProjectsApp";
import GitHubApp from "./components/apps/GitHubApp/GitHubApp";
import SkillsApp from "./components/apps/SkillsApp/SkillsApp";
import SpotifyApp from "./components/apps/SpotifyApp/SpotifyApp";
import DevCounterApp from "./components/apps/Calendev/Calendev";
import logoLight from "./assets/images/logo-light.png";
import logoDark from "./assets/images/logo-dark.png";
import tapSound from "./assets/sound/tap.mp3";
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

  const [isAnimationPaused, setIsAnimationPaused] = useState(() => {
    const savedAnimation = localStorage.getItem("animationPaused");
    return savedAnimation ? savedAnimation === "true" : false;
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

  useEffect(() => {
    localStorage.setItem(
      "animationPaused",
      isAnimationPaused ? "true" : "false"
    );
  }, [isAnimationPaused]);

  const playSound = (audioUrl) => {
    if (!isSoundOn) return;
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const apps = [
    { name: "Settings", icon: faGear, id: "settings" },
    { name: "Contact", icon: faEnvelope, id: "contact" },
    { name: "Projects", icon: faFolderOpen, id: "projects" },
    { name: "Skills", icon: faUserGear, id: "skills" },
    { name: "GitHub", icon: faGithub, id: "github" },
    { name: "Spotify", icon: faSpotify, id: "spotify" },
    { name: "Calendev", icon: faCode, id: "devcounter" },
  ];

  const handleOpenApp = (app) => {
    playSound(tapSound);
    setOpenedApp(app);
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
                  alt="Logo"
                  className="inline-logo"
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
              <div key={isDark} className="app-opened">
                {openedApp.id === "settings" && (
                  <SettingsApp
                    isDark={isDark}
                    toggleTheme={() => setIsDark((prev) => !prev)}
                    isSoundOn={isSoundOn}
                    toggleSound={() => setIsSoundOn((prev) => !prev)}
                    isAnimationPaused={isAnimationPaused}
                    toggleAnimation={() =>
                      setIsAnimationPaused((prev) => !prev)
                    }
                    onBackHome={() => setOpenedApp(null)}
                  />
                )}
                {openedApp.id === "contact" && (
                  <ContactApp onBackHome={() => setOpenedApp(null)} />
                )}
                {openedApp.id === "projects" && (
                  <ProjectsApp onBackHome={() => setOpenedApp(null)} />
                )}
                {openedApp.id === "github" && (
                  <GitHubApp onBackHome={() => setOpenedApp(null)} />
                )}
                {openedApp.id === "skills" && (
                  <SkillsApp onBackHome={() => setOpenedApp(null)} />
                )}
                {openedApp.id === "spotify" && (
                  <SpotifyApp onBackHome={() => setOpenedApp(null)} />
                )}
                {openedApp.id === "devcounter" && (
                  <DevCounterApp onBackHome={() => setOpenedApp(null)} />
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
