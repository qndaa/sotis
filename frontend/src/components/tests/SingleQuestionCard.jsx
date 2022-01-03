import React, { useRef } from "react";
import { Card } from "react-bootstrap";
import { Formik, Field, Form } from "formik";

const SingleQuestionCard = ({
  question,
  identifier,
  nextQuestionLogic,
  previousQuestionLogic,
  givenAnswers,
  firstQuestionId,
  submitLogic,
  totalTestLength,
}) => {
  const formik = useRef();

  const renderNextButton = () => identifier !== totalTestLength;

  const renderAnswers = () => {
    // console.log(
    //   givenAnswers.length > 0 ? givenAnswers[0].data?.selected : "NEMA ODG"
    // );
    return question.all_answers.map((answer) => (
      <div key={answer.id}>
        <Field
          type="checkbox"
          name="selected"
          value={answer.id}
          className="mr-2"
        />
        <label>{answer.text}</label>
        <br />
      </div>
    ));
  };

  const isFirstQuestion = () => firstQuestionId === question.id;

  return (
    <>
      {question && (
        <Formik
          innerRef={formik}
          initialValues={{
            selected: [],
          }}
          onSubmit={(data) => {
            nextQuestionLogic(data);
          }}
        >
          <Form>
            <Card className="mb-2">
              <Card.Header>
                <b>
                  {identifier}. {question.text}
                </b>
              </Card.Header>
              <Card.Body>{renderAnswers()}</Card.Body>
            </Card>
            <div className="d-flex justify-content-between mt-3">
              {!isFirstQuestion() && (
                <button
                  className="btn btn-secondary"
                  type="button"
                  name="action"
                  value="previous"
                  onClick={() => {
                    previousQuestionLogic(formik.current.values);
                  }}
                >
                  Previous
                </button>
              )}
              {renderNextButton() && (
                <button
                  className="btn btn-primary"
                  type="submit"
                  name="action"
                  value="next"
                >
                  Next
                </button>
              )}
              <button
                className="btn btn-success"
                name="action"
                value="next"
                onClick={() => {
                  submitLogic(formik.current.values);
                }}
                type="button"
              >
                Finish Test
              </button>
            </div>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default SingleQuestionCard;
