import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const KnowledgeSpaceSelector = ({
  knowledgeSpaces,
  selectedKnowledgeSpace,
  setSelectedKnowledgeSpace,
  setConnections,
  setSelectedTests,
  setSelectedQuestions,
  setSelectedDomains,
  domains,
  problems,
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

  const fetchRelatedDomains = (filteredSelectedTests, questions) => {
    console.log(questions);
    return questions.map((question) => domainForQuestion(question.domain_id));
  };

  const domainForQuestion = (domainId) =>
    domains && domains.filter((domain) => domain.id === domainId)[0];

  const getProblemById = (problemId) => {
    problems.filter((problem) => problemId);
    if (problems.length) return problems[0];
  };

  const renderKnowledgeSpaces = () => {
    return knowledgeSpaces.map((knowledgeSpace) => (
      <li key={knowledgeSpace.id} className="list-group-item">
        {selectedKnowledgeSpace &&
        selectedKnowledgeSpace.id == knowledgeSpace.id ? (
          <span className="text-success">Chosen: &nbsp;</span>
        ) : (
          <button
            className="btn btn-primary mr-2"
            onClick={() => {
              const newSelectedTests = knowledgeSpace.tests;
              const questions = knowledgeSpace.questions;
              const newSelectedDomains = fetchRelatedDomains(
                newSelectedTests,
                questions
              );
              console.log(newSelectedDomains);

              setSelectedDomains(newSelectedDomains);
              setSelectedQuestions(questions);
              setSelectedKnowledgeSpace(knowledgeSpace);
              setSelectedTests(knowledgeSpace.tests);
              setConnections(knowledgeSpace.domain_connections);
              setSelectedProblems(getProblemById(knowledgeSpace.problem.id));
            }}
          >
            Open
          </button>
        )}
        {knowledgeSpace.name}
      </li>
    ));
  };
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-title d-flex justify-content-center">
        <h3 className="mt-3">Open a ks!</h3>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-center">
          {/* <button className="btn btn-text mb-2" onClick={openNewProblemModal}>
            Create new
          </button> */}
        </div>
        {knowledgeSpaces ? (
          <ul className="list-group">{renderKnowledgeSpaces()}</ul>
        ) : (
          <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
        )}
      </div>
    </div>
  );
};

export default KnowledgeSpaceSelector;
