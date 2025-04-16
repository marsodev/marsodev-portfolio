import React, { useState } from "react";
import SlideToUnlock from "./components/SlideToUnlock/SlideToUnlock";
import "./styles/reset.css";
import "./styles/app.css";

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className="App">
      {!isUnlocked ? (
        <SlideToUnlock onUnlock={() => setIsUnlocked(true)} />
      ) : (
        <div className="home">
          <h1>Bienvenue 🚀</h1>
        </div>
      )}
    </div>
  );
}

export default App;
