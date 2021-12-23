import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const ProblemPopup = ({ show, setShow, addProblem }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    addProblem(data.name);
    setShow(false);
  };

  return (
    <Modal show={show} hide={() => setShow(false)}>
      <Modal.Header>Select a question!</Modal.Header>
      <form onSubmit={handleSubmit(submit)}>
        <Modal.Body>
          <div className="form-group">
            <input
              type="text"
              className={`form-control form-control-user ${
                errors.name ? "is-invalid" : ""
              }`}
              id="name"
              placeholder="Enter problem name"
              {...register("name", {
                required: "Name is required!",
                minLength: {
                  value: 3,
                  message: "Name too short!",
                },
                maxLength: {
                  value: 255,
                  message: "Name too long!",
                },
              })}
              autoComplete={`false`}
            />
            {errors.name && (
              <div className="invalid-feedback ml-3">{errors.name.message}</div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ProblemPopup;
