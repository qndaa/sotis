import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const ConnectionPopup = ({ allQuestions, show, setShow, addConnection }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const renderOptions = () => {
    console.log(allQuestions);
    return allQuestions.map((question, index) => (
      <option key={index} value={index}>
        {question.name}
      </option>
    ));
  };

  const submit = (data) => {
    addConnection(data.start, data.end);
    setShow(false);
  };

  return (
    <Modal show={show} hide={() => setShow(false)}>
      <Modal.Header>Select a start and an end point!</Modal.Header>
      <form onSubmit={handleSubmit(submit)}>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="start">Start</label>
            <select
              id="start"
              {...register("start", {
                required: "Start is required!",
              })}
            >
              {renderOptions()}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="end">End</label>
            <select
              id="end"
              {...register("end", {
                required: "End is required!",
              })}
            >
              {renderOptions()}
            </select>
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

export default ConnectionPopup;
