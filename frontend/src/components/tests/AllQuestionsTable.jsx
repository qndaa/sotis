import React from "react";

const AllQuestionsTable = ({
  questions,
  setQuestions,
  selectedQuestions,
  setSelectedQuestions,
}) => {
  const renderRows = () =>
    questions.map((question, index) => (
      <tr key={index}>
        <td>
          <input
            type="checkbox"
            checked={selectedQuestions[index]}
            onChange={(e) => {
              selectedQuestions[index] = true;
              const copy = selectedQuestions.slice();
              setSelectedQuestions([]);
              setSelectedQuestions(copy);
            }}
          />
        </td>
        <td>{question.text}</td>
      </tr>
    ));
  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Add</th>
          <th>Text</th>
        </tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </table>
  );
};

export default AllQuestionsTable;
