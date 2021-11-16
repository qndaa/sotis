import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import NewAnswerModal from "./NewAnswerModal";
import { useDispatch, useSelector } from "react-redux";
import AllAnswersTable from "./AllAnswersTable";
import {
  createNewAnswer,
  createNewQuestion,
  closeSuccessToast,
} from "../store/actions/tests";
import Toast from "../toast";

const CreateQuestion = () => {
  const dispatch = useDispatch();
  let answersWithIds = useSelector((state) => state.tests.answers);
  const submit = (data) => {
    console.log(data);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [answerModalVisible, setAnswerModalVisible] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [answers, setAnswers] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [value, setValue] = useState(0);

  const showSuccessToast = useSelector((state) => state.tests.showSuccessToast);

  const handleSuccessToastClose = () => {
    dispatch(closeSuccessToast());
  };

  const submitNewQuestion = () => {
    const allAnswers = [];
    answersWithIds.forEach((answer) => allAnswers.push(answer.id));
    const correctAnswers = [];
    answers.forEach((answer) => {
      answer.isCorrect && correctAnswers.push(answer.text);
    });

    console.log(correctAnswers);

    const correctAnswersWithIds = answersWithIds.filter((answer) => {
      console.log(answer.identifier);
      return correctAnswers.includes(answer.text);
    });

    const correctAnswerIds = [];
    correctAnswersWithIds.forEach((answer) => {
      correctAnswerIds.push(answer.id);
    });

    console.log(correctAnswersWithIds);

    dispatch(
      createNewQuestion(
        questionText,
        0,
        correctAnswers.length,
        value,
        correctAnswerIds,
        allAnswers
      )
    );
  };

  const handleAnswerSave = (text) => {
    answers.push({
      identifier: answers.length + 1,
      text: text,
      isCorrect: false,
    });
    dispatch(createNewAnswer(text, answers.length + 1));
  };

  const handleAnswerModalClose = () => {
    setAnswerModalVisible(false);
    setAnswerText("");
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9 mt-5">
          <div className=" o-hidden border-0 my-5">
            <div className="card-body p-0">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        Create a question!
                      </h1>
                    </div>
                    <form className="user " onSubmit={handleSubmit(submit)}>
                      <div className="form-group">
                        <textarea
                          value={questionText}
                          onChange={(e) => {
                            setQuestionText(e.target.value);
                            console.log(e.target.value);
                          }}
                          className={`form-control rounded form-control-user`}
                          id="text"
                          placeholder="Enter question text..."
                          autoComplete={`false`}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          type="number"
                          min="0"
                          className={`form-control rounded form-control-user`}
                          id="value"
                          placeholder="Enter question value here."
                          autoComplete={`false`}
                        />
                      </div>

                      {/* <button className="btn btn-primary btn-user btn-block">
                      Login
                    </button> */}
                    </form>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn btn-primary-outlined"
        onClick={() => {
          setAnswerModalVisible(true);
        }}
      >
        Add an answer
      </button>

      <div className="d-flex justify-content-center">
        <NewAnswerModal
          show={answerModalVisible}
          handleClose={handleAnswerModalClose}
          answerText={answerText}
          setAnswerText={setAnswerText}
          handleSave={handleAnswerSave}
        />
      </div>

      {answers.length > 0 && (
        <>
          <AllAnswersTable answers={answers} setAnswers={setAnswers} />
          <hr />
        </>
      )}

      <div className="row justify-content-center mb-2">
        <button className="btn btn-primary" onClick={submitNewQuestion}>
          Submit
        </button>
      </div>
      <Toast
        title={"Success"}
        text={"Question successfully created!"}
        show={showSuccessToast}
        handleClose={handleSuccessToastClose}
      />
    </>
  );
};

export default CreateQuestion;
