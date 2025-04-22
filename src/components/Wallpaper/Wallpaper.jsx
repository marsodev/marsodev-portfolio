import React, { useRef, useEffect } from "react";
import WallpaperIcon from "./WallpaperIcon";
import useWallpaperElements from "./useWallpaperElements";
import "./Wallpaper.css";

const Wallpaper = ({ isPaused }) => {
  const { elementsRef, containerRef } = useWallpaperElements();

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
        <WallpaperIcon key={el.id} el={el} />
      ))}
    </div>
  );
};

export default Wallpaper;
