{/* Reusable Component -> Used in News and BookMarks Features */ }
import React from 'react';
import './Modal.css';
import './NewsModal.css'

const Modal = ({ show, onClose, children }) => {
  
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
