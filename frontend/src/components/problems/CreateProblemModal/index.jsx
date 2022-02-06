import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";

const CreateProblemModal = ({ show, handleClose, submit }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a new problem!</Modal.Title>
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
            <Field name="name" required></Field>
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

export default CreateProblemModal;
