import React, { useState } from "react";
import "./Widget.css";

const Widget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id="react-widget">
      <div className="widget-container">
        {!isOpen ? (
          <button className="widget-button" onClick={toggleWidget}>
            Open Widget
          </button>
        ) : (
          <div className="widget-modal">
            <button className="widget-close" onClick={toggleWidget}>
              &times;
            </button>
            <div className="widget-content">
              <h2>Welcome to the Widget!</h2>
              <p>This is your custom widget content.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Widget;
