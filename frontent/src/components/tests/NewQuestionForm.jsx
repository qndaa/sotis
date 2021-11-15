import React from "react";
import { useForm } from "react-hook-form";
import NewAnswerForm from "./NewAnswerForm";

const NewQuestionForm = ({
  submitNewAnswer,
  newAnswerVisible,
  setNewAnswerVisible,
  newAnswerText,
  setNewAnswerText,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="row justify-content-center">
      <div className="col-xl-10 col-lg-12 col-md-9">
        <div className=" o-hidden border-0 my-5">
          <div className="card-body p-0">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Add a question!</h1>
                  </div>
                  <form
                    className="user "
                    onSubmit={() => handleSubmit(submitNewAnswer)}
                  >
                    <div className="form-group">
                      <textarea
                        type="text"
                        className={`form-control form-control-user rounded ${
                          errors.text ? "is-invalid" : ""
                        }`}
                        id="text"
                        placeholder="Enter text..."
                        {...register("text", {
                          required: "Question text is required!",
                          minLength: {
                            value: 3,
                            message: "Question too short!",
                          },
                        })}
                        autoComplete={`false`}
                      />

                      {errors.text && (
                        <div className="invalid-feedback ml-3">
                          {errors.text.message}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        className={`form-control form-control-user`}
                        id="minChoices"
                        min="0"
                        placeholder="Minimum choices"
                        {...register("minChoices", {
                          required: "A minimum number of choices is required!",
                        })}
                      />
                      {errors.password && (
                        <div className="invalid-feedback ml-3">
                          {errors.minChoices.message}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        min="0"
                        className={`form-control form-control-user`}
                        id="maxChoices"
                        placeholder="Maximum choices"
                        {...register("maxChoices", {
                          required: "A maximum number of choices is required!",
                        })}
                      />
                      {errors.password && (
                        <div className="invalid-feedback ml-3">
                          {errors.maxChoices.message}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        min="0"
                        className={`form-control form-control-user`}
                        id="timeToAnswer"
                        placeholder="Time to answer the question in minutes"
                      />
                    </div>
                    <div className={`form-row justify-content-center`}>
                      <button
                        className={`btn btn-outline-primary ml-4 mt-2`}
                        // onClick={addPart}
                      >
                        Save
                      </button>
                      <button
                        className={`btn btn-outline-secondary ml-4 mt-2`}
                        // onClick={resetForm}
                        onClick={(e) => {
                          setNewAnswerVisible(true);
                          e.preventDefault();
                        }}
                      >
                        Add answer
                      </button>
                      <button
                        className={`btn btn-outline-danger ml-4 mt-2`}
                        // onClick={resetForm}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                  <hr />
                  {newAnswerVisible && (
                    <NewAnswerForm
                      submit={(text) => submitNewAnswer(text)}
                      hide={() => {
                        setNewAnswerVisible(false);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewQuestionForm;
