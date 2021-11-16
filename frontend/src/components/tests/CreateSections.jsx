import React, { useEffect, useState } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import { fetchAllQuestions, saveSection } from "../store/actions/tests";
import AllQuestionsTable from "./AllQuestionsTable";

const CreateSections = () => {
  const [sectionTitle, setSectionTitle] = useState("");
  const [formattedQuestions, setFormattedQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const dispatch = useDispatch();
  const allQuestions = useSelector((state) => state.tests.allQuestions);

  useEffect(() => {
    dispatch(fetchAllQuestions());
  }, []);

  const handleSectionSave = () => {
    const selected = [];
    allQuestions.forEach(
      (question, index) =>
        selectedQuestions[index] && selected.push(question.id)
    );

    console.log(selected);

    dispatch(saveSection(sectionTitle, selected));
  };

  // useEffect(() => {
  // allQuestions &&
  allQuestions.forEach((question) => {
    formattedQuestions.push({
      id: question.id,
      text: question.text,
      selected: false,
    });
    console.log("here again");
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

                  <div className="form-group">
                    <input
                      type="text"
                      className={`form-control form-control-user`}
                      id="text"
                      placeholder="Enter section title here!"
                      autoComplete={`false`}
                      value={sectionTitle}
                      onChange={(e) => setSectionTitle(e.target.value)}
                    />
                  </div>

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
      <button className="btn btn-primary" onClick={handleSectionSave}>
        Save
      </button>
    </div>
  );
};

export default CreateSections;
