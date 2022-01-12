import React from "react";
import { Modal } from "react-bootstrap";

const QtiDialog = ({ show, setShow, template }) => {
  return (
    <Modal show={show} hide={() => setShow(false)}>
      <Modal.Header>Here's your template!</Modal.Header>

      <Modal.Body>
        <span>{template}</span>
      </Modal.Body>
      <Modal.Footer>
        <button
          class="btn btn-success"
          onClick={() => {
            navigator.clipboard.writeText(template);
            alert("Copied to clipboard!");
          }}
        >
          Copy to clipboard!
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            setShow(false);
          }}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default QtiDialog;
