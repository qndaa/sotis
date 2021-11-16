import React from "react";

const AllAnswersTable = ({ answers, setAnswers }) => {
  const renderRows = () =>
    answers.map((answer, index) => (
      <tr key={answer.identifier}>
        <td>
          <input
            type="checkbox"
            checked={answer.isCorrect}
            onChange={(e) => {
              console.log(e.target.value);
              answer.isCorrect = !answer.isCorrect;
              let answersCopy = answers.slice();
              answersCopy[index] = answer;
              setAnswers(answersCopy);
              console.log(answersCopy);
            }}
          />
        </td>
        <td scope="row">{answer.identifier}</td>
        <td>{answer.text}</td>
      </tr>
    ));

  return (
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
  );
};

export default AllAnswersTable;
