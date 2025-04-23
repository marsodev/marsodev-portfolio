import { useRef } from "react";
import reactBlue from "../../../assets/images/react.png";
import reactRed from "../../../assets/images/reactred.png";
import reactYellow from "../../../assets/images/reactyellow.png";
import reactGreen from "../../../assets/images/reactgreen.png";
import reactPurple from "../../../assets/images/reactpurple.png";

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

export default function useWallpaperElements() {
  const elementsRef = useRef(getInitialIcons());
  const containerRef = useRef(null);
  return { elementsRef, containerRef };
}
