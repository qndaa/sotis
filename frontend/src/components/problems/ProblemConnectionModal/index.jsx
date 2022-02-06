import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import testService from "../../../services/tests/TestService";

const ProblemConnectionModal = ({ show, handleClose, problems, tests }) => {
  const submit = (values) => {
    testService.assignProblemToTest(values.test, values.problem);
  };
  const renderProblemOptions = () =>
    problems.length > 0 &&
    problems.map((problem) => (
      <option key={problem.id} value={problem.id}>
        {problem.name}
      </option>
    ));

  const renderTestOptions = () =>
    tests &&
    tests.map((test) => (
      <option key={test.id} value={test.id}>
        {test.identifier}
      </option>
    ));
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Connect a problem to a test!</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ problem: "", test: "" }}
        onSubmit={(values, { resetForm }) => {
          submit(values);
          resetForm();
          handleClose();
        }}
      >
        <Form>
          <Modal.Body>
            <Field name="problem" as="select" required>
              {renderProblemOptions()}
            </Field>
            <Field name="test" as="select" required>
              {renderTestOptions()}
            </Field>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-success-outlined">
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

export default ProblemConnectionModal;
