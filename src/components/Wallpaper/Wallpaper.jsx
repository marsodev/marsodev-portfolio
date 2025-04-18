import React, { useEffect, useState, useRef } from "react";
import "./Wallpaper.css";
import reactBlue from "../../assets/images/react.png";
import reactRed from "../../assets/images/reactred.png";
import reactYellow from "../../assets/images/reactyellow.png";
import reactGreen from "../../assets/images/reactgreen.png";

const icons = [reactBlue, reactRed, reactYellow, reactGreen];

const generateBalancedIcons = (totalCount) => {
  const elements = [];
  const minDistance = 10;

  const perIcon = Math.floor(totalCount / icons.length);

  icons.forEach((icon) => {
    for (let i = 0; i < perIcon; i++) {
      let placed = false;
      while (!placed) {
        const baseX = Math.random() * 100;
        const baseY = Math.random() * 100;
        const size = 20 + Math.random() * 20;

        const tooClose = elements.some(
          (el) => Math.hypot(el.baseX - baseX, el.baseY - baseY) < minDistance
        );

        if (!tooClose) {
          elements.push({
            id: Math.random(),
            baseX,
            baseY,
            x: baseX,
            y: baseY,
            size,
            rotation: Math.random() * 360,
            speedRotation: 0.02 + Math.random() * 0.05,
            driftRange: 1 + Math.random() * 2,
            img: icon,
          });
          placed = true;
        }
      }
    }
  });

  // Mélange un peu l'ordre final
  return elements.sort(() => Math.random() - 0.5);
};

const Wallpaper = ({ isPaused }) => {
  const [elements, setElements] = useState(generateBalancedIcons(40));
  const mouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouse.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove);

    let frame;
    const animate = () => {
      if (!isPaused) {
        setElements((prev) =>
          prev.map((el) => ({
            ...el,
            x:
              el.baseX +
              Math.sin(Date.now() / 2000 + el.id) * el.driftRange +
              mouse.current.x * 5,
            y:
              el.baseY +
              Math.cos(Date.now() / 2000 + el.id) * el.driftRange +
              mouse.current.y * 5,
            rotation: el.rotation + el.speedRotation,
          }))
        );
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isPaused]); // ← important de réagir à isPaused

  return (
    <div className="wallpaper" ref={containerRef}>
      {elements.map((el) => (
        <img
          key={el.id}
          src={el.img}
          alt="background-react"
          className="wallpaper-icon"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            width: `${el.size}px`,
            transform: `rotate(${el.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default Wallpaper;
