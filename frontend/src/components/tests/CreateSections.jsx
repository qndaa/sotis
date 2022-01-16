import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuestions } from "../store/actions/tests";
import AllQuestionsTable from "./AllQuestionsTable";
import { Formik, Form, Field } from "formik";
import testService from "../../services/tests/TestService";

const CreateSections = () => {
  const [formattedQuestions, setFormattedQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const dispatch = useDispatch();
  const allQuestions = useSelector((state) => state.tests.allQuestions);

  useEffect(() => {
    dispatch(fetchAllQuestions());
  }, []);

  const handleSectionSave = (values) => {
    const selected = [];
    allQuestions.forEach(
      (question, index) =>
        selectedQuestions[index] && selected.push(question.id)
    );

    testService.saveSection({
      title: values.sectionTitle,
      identifier: values.sectionTitle,
      questions: selected,
    });

    setSelectedQuestions([]);
  };

  // useEffect(() => {
  // allQuestions &&
  allQuestions.forEach((question) => {
    formattedQuestions.push({
      id: question.id,
      text: question.text,
      selected: false,
    });
  });

  allQuestions.forEach(() => selectedQuestions.push(false));
  // });

  return (
    <div className="row justify-content-center p-5">
      <div className="col-xl-10 col-lg-12 col-md-9 mt-5">
        <div className=" o-hidden border-0 my-5">
          <div className="card-body p-0">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Create a section!</h1>
                  </div>
                  <Formik
                    initialValues={{ sectionTitle: "" }}
                    onSubmit={(values, { resetForm }) => {
                      handleSectionSave(values);
                      resetForm();
                    }}
                  >
                    <Form>
                      <div className="form-group">
                        <Field
                          type="text"
                          className={`form-control form-control-user`}
                          id="text"
                          placeholder="Enter section title here!"
                          autoComplete={`false`}
                          name="sectionTitle"
                        ></Field>
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <button type="submit" className="btn btn-primary">
                          Save
                        </button>
                      </div>
                    </Form>
                  </Formik>

                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {formattedQuestions && (
        <AllQuestionsTable
          questions={allQuestions}
          setQuestions={setFormattedQuestions}
          selectedQuestions={selectedQuestions}
          setSelectedQuestions={setSelectedQuestions}
        />
      )}
    </div>
  );
};

export default CreateSections;
