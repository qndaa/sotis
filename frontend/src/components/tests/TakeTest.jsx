import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTest } from "../store/actions/tests";
import { useParams } from "react-router-dom";
import SingleQuestionCard from "./SingleQuestionCard";

const TakeTest = () => {
  const dispatch = useDispatch();
  const id = useParams();
  const selectedTest = useSelector((state) => state.tests.selectedTest);

  const renderQuestions = () => {
    const questions = [];
    selectedTest.sections.forEach((section) => {
      questions.push(section.questions);
    });

    return questions[0].map((question, index) => (
      <SingleQuestionCard question={question} identifier={index + 1} />
    ));
  };

  useEffect(() => {
    dispatch(fetchTest(id.id));
  }, [id]);
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        transform: "translate(-50%, 0)",
        maxWidth: "40%",
      }}
    >
      {selectedTest && renderQuestions()}
      <button className="btn btn-primary mt-5">Submit</button>
    </div>
  );
};

export default TakeTest;
