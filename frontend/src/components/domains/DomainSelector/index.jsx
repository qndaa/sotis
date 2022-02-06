import React from "react";
import { Formik, Form, Field } from "formik";
import { Modal } from "react-bootstrap";

const DomainSelector = ({ domains, submit, show, handleClose }) => {
  const renderDomainOptions = () =>
    domains &&
    domains.map((domain) => {
      return (
        <option key={domain.id} value={domain.id}>
          {domain.name}
        </option>
      );
    });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New answer!</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          source: domains.length ? domains[0].id : "",
          target: domains.length ? domains[0].id : "",
        }}
        onSubmit={(value, { resetForm }) => {
          submit(value);
          resetForm();
          handleClose();
        }}
      >
        <Form className="ml-2 mt-2">
          <div className="form-group">
            <label htmlFor="source" className="mr-2">
              Source:
            </label>
            <Field name="source" as="select">
              {renderDomainOptions()}
            </Field>
          </div>
          <div className="form-group">
            <label htmlFor="target" className="mr-2">
              Target:
            </label>
            <Field name="target" as="select">
              {renderDomainOptions()}
            </Field>
          </div>

          <Modal.Footer>
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleClose}
            >
              Close
            </button>
            <button className="btn btn-success" type="submit">
              Save
            </button>
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>
  );
};

export default DomainSelector;
