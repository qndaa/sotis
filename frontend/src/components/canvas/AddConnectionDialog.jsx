import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";

const AddConnectionDialog = ({ show, setShow, submit, domains }) => {
  const renderOptions = () =>
    domains &&
    domains.map((domain, index) => (
      <option key={index} value={domain.id}>
        {domain.name}
      </option>
    ));

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>Select a start and an end point!</Modal.Header>
      <Formik
        initialValues={{ from_node: "", to_node: "" }}
        onSubmit={(values, { resetForm }) => {
          submit(values);
          resetForm();
        }}
      >
        <Form>
          <Modal.Body>
            <label htmlFor="from">From:</label>
            <div className="form-group">
              <Field as="select" name="from_node" required>
                {renderOptions()}
              </Field>
            </div>
            <label htmlFor="end">End:</label>
            <div className="form-group">
              <Field as="select" name="to_node" required>
                {renderOptions()}
              </Field>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className=" btn btn-outline-primary" type="submit">
              Submit
            </button>
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AddConnectionDialog;
