import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const TestSelector = ({
  tests,
  setSelectedTests,
  selectedTests,
  setQuestions,
  questions,
  setSelectedDomains,
  selectedDomains,
  domains,
  selectedProblems,
  setSelectedProblems,
}) => {
  const calculateQuestions = (filtered) => {
    let sections = [];
    filtered.forEach((test) => {
      sections = [...sections, ...test.sections];
    });

    let selectedQuestions = [];
    sections.forEach(
      (section) =>
        (selectedQuestions = [...selectedQuestions, ...section.questions])
    );

    return selectedQuestions;
  };

  const fetchRelatedDomains = (filteredSelectedTests) => {
    questions = calculateQuestions(filteredSelectedTests);
    let domains = [];
    questions.forEach((question) => {
      domains.push(domainForQuestion(question.domain));
    });
    return domains;
  };

  const domainForQuestion = (domainId) =>
    domains && domains.filter((domain) => domain.id === domainId)[0];

  const renderTests = () =>
    tests &&
    tests.map((test) => (
      <li key={test.id} className="list-group-item">
        {selectedTests.map((test) => test.id).includes(test.id) ? (
          <button
            className="btn btn-danger mr-2"
            onClick={() => {
              const filtered = selectedTests.filter(
                (sTest) => sTest.id !== test.id
              );
              setSelectedTests(filtered);
              setQuestions(calculateQuestions(filtered));
            }}
          >
            Remove
          </button>
        ) : (
          <button
            className="btn btn-primary mr-2"
            onClick={() => {
              const newTest = test;
              newTest["questions"] = calculateQuestions([test]);
              const newSelectedTests = [...selectedTests, newTest];

              setQuestions(calculateQuestions(newSelectedTests));
              const newSelectedDomains = selectedDomains.concat(
                fetchRelatedDomains(newSelectedTests)
              );

              setSelectedDomains(newSelectedDomains);
              setSelectedTests(newSelectedTests);
            }}
          >
            Add
          </button>
        )}
        {test.identifier}
      </li>
    ));
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-title d-flex justify-content-center mt-3">
        <h3>Add tests!</h3>
      </div>
      <div className="card-body">
        {tests.length > 0 ? (
          <ul className="list-group">{renderTests()}</ul>
        ) : (
          <div className="d-flex justify-content-center">
            <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TestSelector;
