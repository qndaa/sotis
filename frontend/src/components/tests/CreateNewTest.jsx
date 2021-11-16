import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSections, saveTest } from "../store/actions/tests";
import AllSectionsTable from "./AllSectionsTable";

const CreateNewTest = () => {
  const dispatch = useDispatch();
  const [testTitle, setTestTitle] = useState("");
  const [selectedSections, setSelectedSections] = useState([]);
  const allSections = useSelector((state) => state.tests.allSections);

  useEffect(() => {
    dispatch(fetchAllSections());
  }, []);

  const handleTestSave = () => {
    const selectedIds = [];
    allSections.forEach(
      (section, index) =>
        selectedSections[index] && selectedIds.push(section.id)
    );

    console.log(selectedIds);

    dispatch(saveTest(testTitle, selectedIds));
  };

  allSections.forEach(() => selectedSections.push(false));

  return (
    <div className="row justify-content-center p-5">
      <div className="col-xl-10 col-lg-12 col-md-9 mt-5">
        <div className=" o-hidden border-0 my-5">
          <div className="card-body p-0">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Create a test!</h1>
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className={`form-control form-control-user`}
                      id="text"
                      placeholder="Enter test title here!"
                      autoComplete={`false`}
                      value={testTitle}
                      onChange={(e) => setTestTitle(e.target.value)}
                    />
                  </div>

                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {formattedQuestions && (
        <AllQuestionsTable
          questions={allQuestions}
          setQuestions={setFormattedQuestions}
          selectedQuestions={selectedQuestions}
          setSelectedQuestions={setSelectedQuestions}
        />
      )} */}
      <AllSectionsTable
        selectedSections={selectedSections}
        setSelectedSections={setSelectedSections}
        sections={allSections}
      />
      <button className="btn btn-primary" onClick={handleTestSave}>
        Save
      </button>
    </div>
  );
};

export default CreateNewTest;
