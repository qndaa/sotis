import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";

const OnClickDomainConnection = ({
  show,
  handleClose,
  domains,
  selectedDomain,
  handleSubmit,
  questions,
}) => {
  const [questionMode, setQuestionMode] = useState(false);

  const mapQuestionOptions = () =>
    questions.map((question) => (
      <option key={question.id} value={question.id}>
        {question.text}
      </option>
    ));

  const mapDomainOptions = () =>
    domains &&
    domains
      .filter((domain) => domain.name != selectedDomain)
      .map((domain) => (
        <option key={domain.id} value={domain.id}>
          {domain.name}
        </option>
      ));

  const renderOptions = () => {
    if (questionMode) return mapQuestionOptions();
    return mapDomainOptions();
  };
  return (
    <Modal show={show} onClose={handleClose}>
      <Modal.Header>Select a domain or question to connect to!</Modal.Header>
      <Modal.Body>
        <label htmlFor="checkbox" className="mr-2 mb-2">
          Connect to a question?
        </label>
        <button
          className={`btn ${questionMode ? "btn-success" : "btn-secondary"}`}
          onClick={() => setQuestionMode(!questionMode)}
        >
          {questionMode ? "Yes" : "No"}
        </button>
        <hr className="mb-2" />
        <Formik
          initialValues={{ target: domains ? domains[0] : "" }}
          onSubmit={(value, { resetForm }) => {
            handleSubmit(value, questionMode);
            resetForm();
            handleClose();
          }}
        >
          <Form>
            <div className="form-group">
              <label className="mr-2">Select a target: </label>
              <Field as="select" name="target">
                {renderOptions()}
              </Field>
            </div>
            <button
              className="btn btn-danger mr-2"
              onClick={handleClose}
              type="button"
            >
              Close
            </button>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default OnClickDomainConnection;
