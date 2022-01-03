import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SingleQuestionCard from "./SingleQuestionCard";
import testService from "../../services/tests/TestService";
import { setAnswersForQuestion } from "../store/actions/tests";
import TotalPointsModal from "./TotalPointsModal";
import { useNavigate } from "react-router-dom";

const TakeTest = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [question, setQuestion] = useState(null);
  const givenAnswersSelector = useSelector(
    (state) => state.tests.answersForQuestions
  );
  const [firstQuestionId, setFirstQuestionId] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [totalTestLength, setTotalTestLength] = useState(0);
  const [showTotalPointsModal, setShowTotalPointsModal] = useState(false);
  const [totalPointsEarned, setTotalPointsEarned] = useState(null);
  const [maxPoints, setMaxPoints] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    testService.nextQuestion(params.id, null).then((response) => {
      setQuestion(response.data);
      setFirstQuestionId(response.data["id"]);
      setTotalTestLength(response.data["count"]);
    });
  }, [params]);

  const loadNextQuestion = (reverse) => {
    testService
      .nextQuestion(params.id, question.id, reverse)
      .then((response) => {
        setQuestion(response.data);
        setCurrentStep(reverse ? currentStep - 1 : currentStep + 1);
      });
  };

  const nextQuestionLogic = (data) => {
    // dispatch(setAnswersForQuestion({ questionId: question.id, data: data }));
    cacheAnswers(data);
    loadNextQuestion(false);
  };

  const previousQuestionLogic = (data) => {
    // dispatch(setAnswersForQuestion({ questionId: question.id, data: data }));
    cacheAnswers(data);
    loadNextQuestion(true);
  };

  const submitLogic = (data) => {
    const preparedData = {
      given_answers: data.selected,
      test: params.id,
    };

    testService.createTestHistory(preparedData).then((response) => {
      setShowTotalPointsModal(true);
      setTotalPointsEarned(response.data["total_points"]);
      setMaxPoints(response.data["max_points"]);
      alert(
        `Finished test with ${response.data["total_points"]} of ${response.data["max_points"]}`
      );
      navigate("/home");
    });
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
          firstQuestionId={firstQuestionId}
          submitLogic={submitLogic}
          identifier={currentStep}
          totalTestLength={totalTestLength}
        />
      )}
      {showTotalPointsModal && (
        <TotalPointsModal
          show={showTotalPointsModal}
          handleClose={setShowTotalPointsModal(false)}
          totalPoints={totalPointsEarned}
          maxPoints={maxPoints}
        />
      )}
    </div>
  );
};

export default TakeTest;
