import React from "react";
import { Card, InputGroup } from "react-bootstrap";

const SingleQuestionCard = ({ question, identifier }) => {
  const renderAnswers = () => {
    return question.all_answers.map((answer) => (
      <div>
        <input type="checkbox" /> &nbsp;
        <label>{answer.text}</label>
        <br />
      </div>
    ));
  };

  return (
    <Card className="mb-2">
      <Card.Header>
        {identifier}. <b>{question.text}</b>
      </Card.Header>
      <Card.Body>{renderAnswers()}</Card.Body>
    </Card>
  );
};

export default SingleQuestionCard;
