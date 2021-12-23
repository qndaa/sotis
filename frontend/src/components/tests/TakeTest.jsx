import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SingleQuestionCard from "./SingleQuestionCard";
import testService from "../../services/tests/TestService";
import { setAnswersForQuestion } from "../store/actions/tests";

const TakeTest = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [question, setQuestion] = useState(null);
  const givenAnswersSelector = useSelector(
    (state) => state.tests.answersForQuestions
  );

  useEffect(() => {
    testService
      .nextQuestion(params.id, null)
      .then((response) => setQuestion(response.data));
  }, [params]);

  const loadNextQuestion = () => {
    testService
      .nextQuestion(params.id, question.id)
      .then((response) => setQuestion(response.data));
  };

  const nextQuestionLogic = (data) => {
    // dispatch(setAnswersForQuestion({ questionId: question.id, data: data }));
    cacheAnswers(data);
    loadNextQuestion();
  };

  const previousQuestionLogic = (data) => {
    // dispatch(setAnswersForQuestion({ questionId: question.id, data: data }));
    cacheAnswers(data);
    loadNextQuestion();
  };

  const cacheAnswers = (data) => {
    localStorage.setItem(`${params.id}_answers`, JSON.stringify(data));
  };

  const readCache = () =>
    JSON.parse(localStorage.getItem(`${params.id}_answers`));

  const givenAnswers = givenAnswersSelector.filter(
    (answer) => answer.questionId === question.id
  );

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        transform: "translate(-50%, 0)",
        maxWidth: "40%",
      }}
    >
      {question && (
        <SingleQuestionCard
          question={question}
          nextQuestionLogic={nextQuestionLogic}
          previousQuestionLogic={previousQuestionLogic}
          givenAnswers={givenAnswersSelector}
        />
      )}
    </div>
  );
};

export default TakeTest;
