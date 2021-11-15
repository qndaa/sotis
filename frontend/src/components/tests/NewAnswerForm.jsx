import React, { useState } from "react";
import { useForm } from "react-hook-form";

const NewAnswerForm = ({ submit, hide }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [answerText, setAnswerText] = useState("");
  return (
    <div className="row justify-content-center">
      <div className="col-xl-10 col-lg-12 col-md-9">
        <div className=" o-hidden border-0 my-5">
          <div className="card-body p-0">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Add an answer!</h1>
                  </div>

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
                      value={answerText}
                      onChange={(e) => {
                        setAnswerText(e.target.value);
                      }}
                    />

                    {errors.text && (
                      <div className="invalid-feedback ml-3">
                        {errors.text.message}
                      </div>
                    )}
                  </div>

                  <div className={`form-row justify-content-center`}>
                    <button
                      type="submit"
                      className={`btn btn-outline-primary ml-4 mt-2`}
                      onClick={() => {
                        console.log(answerText);
                        submit(answerText);
                        hide();
                      }}
                    >
                      Save
                    </button>

                    <button
                      className={`btn btn-outline-danger ml-4 mt-2`}
                      onClick={hide}
                    >
                      Cancel
                    </button>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAnswerForm;
