import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Widget.css";

const Widget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const widgetContent = (
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
  );

  // Use ReactDOM.createPortal to render the widget at the <body> level
  return ReactDOM.createPortal(widgetContent, document.body);
};

export default Widget;
