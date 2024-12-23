// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import "./Widget.css";

// const Widget = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleWidget = () => {
//     setIsOpen(!isOpen);
//   };

//   const widgetContent = (
//     <div className="widget-container">
//       <button className="widget-button" onClick={toggleWidget}>
//         {isOpen ? "Close" : "Open"}
//       </button>
//       {isOpen && (
//         <div className="widget-modal">
//           <button className="widget-close" onClick={toggleWidget}>
//             &times;
//           </button>
//           <div className="widget-content">
//             <h2>Welcome to the Widget!</h2>
//             <p>This is your custom widget content.</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   return ReactDOM.createPortal(widgetContent, document.body);
// };

// export default Widget;

import React, { useState } from "react";
import ReactDOM from "react-dom";

const Widget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  // Inline style objects
  const containerStyle = {
    position: "fixed", // Stick to viewport
    bottom: "20px", // Bottom-right corner
    right: "20px",
    zIndex: 2147483647, // Max z-index
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "30px",
    width: "80px",
    height: "50px",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const modalStyle = {
    position: "fixed",
    bottom: "80px",
    right: "20px",
    width: "300px",
    background: "white",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    overflow: "hidden",
    color: "#000000",
  };

  const closeButtonStyle = {
    background: "none",
    border: "none",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    padding: "10px",
    color: "#000000",
  };

  const contentStyle = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  return ReactDOM.createPortal(
    <div style={containerStyle}>
      <button style={buttonStyle} onClick={toggleWidget}>
        {isOpen ? "Close" : "Open"}
      </button>
      {isOpen && (
        <div style={modalStyle}>
          <button style={closeButtonStyle} onClick={toggleWidget}>
            &times;
          </button>
          <div style={contentStyle}>
            <h2>Welcome to the Widget!</h2>
            <p>This is your custom widget content.</p>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

export default Widget;
