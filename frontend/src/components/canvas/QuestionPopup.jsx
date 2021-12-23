import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const QuestionPopup = ({
  allQuestions,
  show,
  setShow,
  submit,
  allProblems,
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(allProblems[0]);

  const renderProblems = () => {
    // setSelectedProblem(allProblems[0]);
    return allProblems.map((problem, index) => (
      <option key={index} value={index}>
        {problem.name}
      </option>
    ));
  };
  const renderRows = () =>
    allQuestions &&
    allQuestions.map((question, index) => (
      <tr key={question.id}>
        <td>
          <input
            type="checkbox"
            defaultChecked={() =>
              selectedQuestion && selectedQuestion.id == question.id
            }
            onChange={() => {
              setSelectedQuestion(question);
            }}
          />
        </td>
        <td scope="row">{question.identifier}</td>
        <td>{question.text}</td>
      </tr>
    ));
  return (
    <Modal show={show} hide={() => setShow(false)}>
      <Modal.Header>Select a question!</Modal.Header>
      <Modal.Body>
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            setSelectedProblem(allProblems[e.target.value]);
            console.log(allProblems[e.target.value]);
          }}
        >
          {renderProblems()}
        </select>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Correct</th>
              <th scope="col">#</th>
              <th>Text</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-primary"
          onClick={() => {
            console.log(selectedProblem);
            submit(selectedQuestion, selectedProblem);
            setShow(false);
          }}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuestionPopup;
