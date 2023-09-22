import React from "react";

const ModalC = ({ isOpen, onClose, children }) => {
  const modalStyle = {
    display: isOpen ? "block" : "none",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "1000",
  };

  const modalContentStyle = {
    backgroundColor: "#fff",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <button className="btn btn-lg" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalC;
