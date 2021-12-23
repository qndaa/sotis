import React, { useRef, useEffect } from "react";
import { Card, InputGroup } from "react-bootstrap";
import { Formik, Field, Form } from "formik";

const SingleQuestionCard = ({
  question,
  identifier,
  nextQuestionLogic,
  previousQuestionLogic,
  givenAnswers,
}) => {
  const formik = useRef();

  useEffect(() => {
    console.log(formik.current.values);
  }, [givenAnswers]);

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
                  {question.identifier}. {question.text}
                </b>
              </Card.Header>
              <Card.Body>{renderAnswers()}</Card.Body>
            </Card>
            <div className="d-flex justify-content-between mt-3">
              <button
                className="btn btn-primary"
                type="button"
                name="action"
                value="previous"
                onClick={() => {
                  previousQuestionLogic(formik.current.values);
                }}
              >
                Previous
              </button>
              <button
                className="btn btn-success"
                type="submit"
                name="action"
                value="next"
              >
                Next
              </button>
            </div>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default SingleQuestionCard;
