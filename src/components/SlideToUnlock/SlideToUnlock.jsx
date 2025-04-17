import React, { useRef, useState, useEffect } from "react";
import "./SlideToUnlock.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

const SlideToUnlock = ({ onUnlock, className = "" }) => {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const trailRef = useRef(null);
  const lettersRef = useRef([]);
  const clearedLetters = useRef(new Set());

  const requestRef = useRef();
  const desiredTrailWidth = useRef(0);

  const START_OFFSET = 8;
  const END_OFFSET = 8;

  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(START_OFFSET);
  const [lastOffset, setLastOffset] = useState(START_OFFSET);

  const maxOffset = () => {
    const container = containerRef.current;
    const button = buttonRef.current;
    if (!container || !button) return 0;
    return container.offsetWidth - button.offsetWidth - END_OFFSET;
  };

  useEffect(() => {
    const animateTrail = () => {
      if (trailRef.current) {
        trailRef.current.style.width = `${desiredTrailWidth.current}px`;
      }
      requestRef.current = requestAnimationFrame(animateTrail);
    };
    requestRef.current = requestAnimationFrame(animateTrail);

    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const handleStart = (e) => {
    setDragging(true);
    clearedLetters.current = new Set();
    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    setStartX(clientX - offsetX);
  };

  const handleMove = (e) => {
    if (!dragging) return;
    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const newOffset = clientX - startX;
    const boundedOffset = Math.max(
      START_OFFSET,
      Math.min(newOffset, maxOffset())
    );

    const direction = boundedOffset > lastOffset ? "right" : "left";
    setLastOffset(boundedOffset);
    setOffsetX(boundedOffset);

    desiredTrailWidth.current = boundedOffset + 25;

    const buttonBox = buttonRef.current?.getBoundingClientRect();

    lettersRef.current.forEach((el, i) => {
      if (!el) return;
      const letterBox = el.getBoundingClientRect();

      const isOverlapping =
        buttonBox.left < letterBox.right &&
        buttonBox.right > letterBox.left &&
        buttonBox.top < letterBox.bottom &&
        buttonBox.bottom > letterBox.top;

      if (direction === "right" && isOverlapping) {
        clearedLetters.current.add(i);
      }

      if (
        direction === "left" &&
        clearedLetters.current.has(i) &&
        buttonBox.right < letterBox.left
      ) {
        clearedLetters.current.delete(i);
      }
    });
  };

  const handleEnd = () => {
    setDragging(false);
    const threshold = maxOffset() * 0.9;

    if (offsetX >= threshold) {
      setOffsetX(maxOffset());
      onUnlock?.();
    } else {
      setOffsetX(START_OFFSET);
      setLastOffset(START_OFFSET);
      clearedLetters.current = new Set();
      desiredTrailWidth.current = 0;
    }
  };

  const renderText = () => {
    const text = "Swipe to unlock";
    return text.split("").map((char, i) => {
      const opacity = clearedLetters.current.has(i) ? 0 : 1;
      return (
        <span
          key={i}
          ref={(el) => (lettersRef.current[i] = el)}
          className="slide-letter"
          style={{ opacity }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div
      className={`slide-container ${className}`}
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      <div className="slide-trail" ref={trailRef}></div>
      <div className="slide-text">{renderText()}</div>
      <div
        className="slide-button"
        ref={buttonRef}
        style={{ transform: `translateX(${offsetX}px)` }}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        <FontAwesomeIcon icon={faArrowRightLong} />
      </div>
    </div>
  );
};

export default SlideToUnlock;
