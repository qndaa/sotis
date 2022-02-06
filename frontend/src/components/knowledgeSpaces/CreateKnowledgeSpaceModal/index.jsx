import React from "react";
import { Formik, Field, Form } from "formik";
import { Modal } from "react-bootstrap";
import testService from "../../../services/tests/TestService";

const CreateKnowledgeSpaceModal = ({
  show,
  handleClose,
  selectedTests,
  newDomainConnections,
  selectedProblem,
}) => {
  const submit = (values) => {
    testService
      .createDomainConnections(
        newDomainConnections.map((dc) => {
          return { from_node: dc.from_node.id, to_node: dc.to_node.id };
        })
      )
      .then((res) =>
        testService.createKnowledgeSpace({
          tests: selectedTests.map((test) => test.id),
          name: values.name,
          computed: false,
          problem: selectedProblem.id,
          domain_connections: res.data.map((dc) => dc.id),
        })
      );
  };
  const renderTests = () =>
    selectedTests &&
    selectedTests.map((test) => (
      <li key={test.id} className="list-item">
        {test.identifier}
      </li>
    ));

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Save new knowledge space!</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values, { resetForm }) => {
          submit(values);
          resetForm();
          handleClose();
        }}
      >
        <Form>
          <Modal.Body>
            {/* <div className="d-flex justify-content-center"> */}
            <div className="form-group">
              <label htmlFor="name" className="mr-2">
                Knowledge space name:
              </label>
              <Field id="name" name="name" required></Field>
            </div>
            {/* </div> */}
            <hr></hr>
            <h6>Items:</h6>
            <br />
            <ul className="item-list-group">{renderTests()}</ul>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary-outlined" type="submit">
              Save
            </button>
            <button
              className="btn btn-secondary-outlined"
              onClick={handleClose}
            >
              Close
            </button>
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>
  );
};

export default CreateKnowledgeSpaceModal;
