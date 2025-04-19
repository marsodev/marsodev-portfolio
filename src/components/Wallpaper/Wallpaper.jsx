import React, { useEffect, useRef } from "react";
import "./Wallpaper.css";
import reactBlue from "../../assets/images/react.png";
import reactRed from "../../assets/images/reactred.png";
import reactYellow from "../../assets/images/reactyellow.png";
import reactGreen from "../../assets/images/reactgreen.png";
import reactPurple from "../../assets/images/reactpurple.png";

const icons = [reactBlue, reactRed, reactYellow, reactGreen, reactPurple];

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

  return elements.sort(() => Math.random() - 0.5);
};

const getInitialIcons = () => {
  const saved = localStorage.getItem("wallpaper-icons");
  if (saved) {
    return JSON.parse(saved);
  } else {
    const generated = generateBalancedIcons(40);
    localStorage.setItem("wallpaper-icons", JSON.stringify(generated));
    return generated;
  }
};

const Wallpaper = ({ isPaused }) => {
  const elementsRef = useRef(getInitialIcons());
  const containerRef = useRef(null);

  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseSmooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseTarget.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove);

    let frame;
    const animate = () => {
      if (containerRef.current && !isPaused) {
        mouseSmooth.current.x +=
          (mouseTarget.current.x - mouseSmooth.current.x) * 0.05;
        mouseSmooth.current.y +=
          (mouseTarget.current.y - mouseSmooth.current.y) * 0.05;

        const icons = containerRef.current.querySelectorAll(".wallpaper-icon");
        icons.forEach((icon, idx) => {
          const el = elementsRef.current[idx];
          if (!el) return;

          const driftX =
            el.baseX +
            Math.sin(Date.now() / 2000 + el.id) * el.driftRange +
            mouseSmooth.current.x * 5;
          const driftY =
            el.baseY +
            Math.cos(Date.now() / 2000 + el.id) * el.driftRange +
            mouseSmooth.current.y * 5;
          el.rotation += el.speedRotation;

          icon.style.transform = `translate3d(${driftX}vw, ${driftY}vh, 0) rotate(${el.rotation}deg)`;
        });
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isPaused]);

  return (
    <div className="wallpaper" ref={containerRef}>
      {elementsRef.current.map((el) => (
        <img
          key={el.id}
          src={el.img}
          alt="background-react"
          className="wallpaper-icon"
          style={{
            width: `${el.size}px`,
            transform: `translate3d(${el.baseX}vw, ${el.baseY}vh, 0) rotate(${el.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default Wallpaper;
