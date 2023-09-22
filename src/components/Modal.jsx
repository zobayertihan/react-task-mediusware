import React from "react";

const Modal = ({ isOpen, onClose, children, openModal }) => {
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
    gap: "10px",
    maxHeight: "80%",
    overflowY: "auto",
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <div className=" d-flex justify-content-center gap-3 my-3 position-relative">
          <button
            className="btn btn-lg btn-outline-primary"
            onClick={() => openModal("AllContacts")}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            onClick={() => openModal("USContacts")}
          >
            US Contacts
          </button>
          <button className="btn btn-lg" onClick={onClose}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
