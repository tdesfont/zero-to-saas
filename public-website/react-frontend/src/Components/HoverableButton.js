import React, { useState, useRef} from 'react';
import './HoverableButton.css'

const HoverableButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isIn, setIsIn] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 700); // 0.7 second delay
  };

  return (
    <span className="button-container">
      <button
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
      >
        Hover over me
      </button>
      {(isHovered || isIn) && (
        <div className="modal" onMouseEnter={() => setIsIn(true)} onMouseLeave={() => setIsIn(false)}>
          <span>This is a modal window!</span>
        </div>
      )}
    </span>
  );
};

export default HoverableButton;
