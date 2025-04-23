import React from "react";

const WallpaperIcon = ({ el }) => {
  return (
    <img
      src={el.img}
      alt="background-react"
      className="wallpaper-icon"
      style={{
        width: `${el.size}px`,
        transform: `translate3d(${el.baseX}vw, ${el.baseY}vh, 0) rotate(${el.rotation}deg)`,
      }}
    />
  );
};

export default WallpaperIcon;
