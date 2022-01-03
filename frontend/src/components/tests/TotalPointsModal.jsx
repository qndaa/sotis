import React from "react";
import { Modal } from "react-bootstrap";

const TotalPointsModal = ({ show, totalPoints, maxPoints, handleClose }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Test Submitted!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            value={`You have earned a total of ${totalPoints} out of ${maxPoints}!`}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary-outlined" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TotalPointsModal;
