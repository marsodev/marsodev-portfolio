import React, { useEffect, useState } from "react";
import "./HomeScreen.css";
import TopBar from "./TopBar";
import AppIcon from "./AppIcon";

const HomeScreen = ({ apps, onOpenApp, isDark, onBackToLanding }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-screen">
      <TopBar time={time} onBackToLanding={onBackToLanding} />
      <div className="apps-grid">
        {apps.map((app, index) => (
          <AppIcon key={index} app={app} onClick={() => onOpenApp(app)} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
