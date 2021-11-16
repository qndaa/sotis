import React from "react";
import { Toast } from "react-bootstrap";

const ToastComponent = ({ title, text, show, handleClose }) => {
  return (
    <Toast show={show} onClose={handleClose}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{text}</Toast.Body>
    </Toast>
  );
};

export default ToastComponent;
