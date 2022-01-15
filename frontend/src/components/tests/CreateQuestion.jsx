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
import testService from "../../services/tests/TestService";

const CreateQuestion = () => {
  const dispatch = useDispatch();
  let answersWithIds = [];
  useEffect(() => {
    answersWithIds = testService.getAllAnswers();
  }, []);
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

  // const showSuccessToast = useSelector((state) => state.tests.showSuccessToast);

  // const handleSuccessToastClose = () => {
  //   dispatch(closeSuccessToast());
  // };

  const submitNewQuestion = (data) => {
    const questionText = data.text;
    const value = data.value;

    const allAnswers = [];
    answersWithIds.forEach((answer) => allAnswers.push(answer.id));
    const correctAnswers = [];
    answers.forEach((answer) => {
      answer.isCorrect && correctAnswers.push(answer.text);
    });

    const correctAnswersWithIds = answersWithIds.filter((answer) => {
      return correctAnswers.includes(answer.text);
    });

    const correctAnswerIds = [];
    correctAnswersWithIds.forEach((answer) => {
      correctAnswerIds.push(answer.id);
    });

    testService.createNewQuestion({
      text: questionText,
      min_choices: 0,
      max_choices: allAnswers.length,
      max_correct_answers: correctAnswers.length,
      value: value,
      correctAnswerIds,
      all_answers: allAnswers,
      time_dependant: false,
    });

    window.location.reload();
  };

  const handleAnswerSave = (data, resetForm) => {
    answers.push({
      identifier: answers.length + 1,
      text: data.answerText,
      isCorrect: data.correct,
    });
    testService.createNewAnswer({
      text: data.answerText,
      identifier: answers.length + 1,
      is_correct: data.correct,
    });

    resetForm();
    handleAnswerModalClose();
  };

  const handleAnswerModalClose = () => {
    setAnswerModalVisible(false);
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
                    <form
                      className="user "
                      onSubmit={handleSubmit(submitNewQuestion)}
                    >
                      <div className="form-group">
                        <textarea
                          className={`form-control rounded form-control-user`}
                          id="text"
                          placeholder="Enter question text..."
                          autoComplete={`false`}
                          {...register("text", {
                            required: "Text is required!",
                            minLength: {
                              value: 4,
                              message: "Text is too short!",
                            },
                          })}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="number"
                          min="0"
                          className={`form-control rounded form-control-user`}
                          id="value"
                          placeholder="Enter question value here."
                          autoComplete={`false`}
                          {...register("value", {
                            required: "Value is required!",
                          })}
                        />
                      </div>

                      <div className="row justify-content-center mb-2">
                        <button className="btn btn-primary" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="btn btn-primary-outlined"
          onClick={() => {
            setAnswerModalVisible(true);
          }}
        >
          Add an answer
        </button>
      </div>

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

      {/* <Toast
        title={"Success"}
        text={"Question successfully created!"}
        show={showSuccessToast}
        handleClose={handleSuccessToastClose}
      /> */}
    </>
  );
};

export default CreateQuestion;
