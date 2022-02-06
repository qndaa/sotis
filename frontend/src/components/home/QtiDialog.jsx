import axios from "axios";
import React from "react";
import { Modal } from "react-bootstrap";
import testService from "../../services/tests/TestService";

const QtiDialog = ({ show, setShow, template }) => {
  const download = () => {
    testService.getTemplate(template.template_name).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: "text/plain" })
      );
      console.log(url);
      var link = document.createElement("a");
      link.setAttribute("download", template.template_name);
      link.href = url;
      link.click();
    });
  };
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>Your template is ready!</Modal.Header>

      <Modal.Body>
        <div className="d-flex justify-content-center">
          <button className="btn btn-success" onClick={download}>
            Download!
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default QtiDialog;
