import React from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Formik, Field, Form } from "formik";

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
        <Formik
          initialValues={{ answerText: "", correct: false }}
          onSubmit={(values, { resetForm }) => {
            handleSave(values, resetForm);
          }}
        >
          <Form>
            <Modal.Body>
              <div className="form-group">
                {/* <textarea
                  id="answerText"
                  placeholder="Enter answer text here."
                  {...register("answerText", {
                    required: "Answer text is required!",
                  })}
                ></textarea> */}
                {/* {errors.answerText && (
                  <div className="invalid-feedback ml-3">
                    {errors.answerText.message}
                  </div>
                )} */}
                <Field
                  type="textarea"
                  name="answerText"
                  placeholder="Answer text here."
                  as="textarea"
                ></Field>
              </div>
              <div className="form-group">
                <label htmlFor="correct">
                  Correct? &nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                {/* <input type="checkbox" id="correct" {...register("correct")} /> */}
                <Field type="checkbox" name="correct"></Field>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-secondary-outlined"
                onClick={handleClose}
              >
                Close
              </button>
              <button className="btn btn-outlined-primary" type="submit">
                Save
              </button>
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};

export default NewAnswerModal;
