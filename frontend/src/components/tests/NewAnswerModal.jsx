import React from "react";
import { Modal } from "react-bootstrap";

const NewAnswerModal = ({
  show,
  answerText,
  setAnswerText,
  handleClose,
  handleSave,
}) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New answer!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary-outlined" onClick={handleClose}>
            Close
          </button>
          <button
            className="btn btn-outlined-primary"
            onClick={() => {
              handleSave(answerText);
              handleClose();
            }}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewAnswerModal;
