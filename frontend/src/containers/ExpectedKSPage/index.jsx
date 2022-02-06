import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import D3canvas from "../../components/canvas/D3canvas";
import testService from "../../services/tests/TestService";
import TestSelector from "../../components/tests/TestSelector";
import DomainSelector from "../../components/tests/DomainSelector";
import problemService from "../../services/problems/ProblemService";
import ProblemSelector from "../../components/problems/ProblemSelector";
import CreateProblemModal from "../../components/problems/CreateProblemModal";
import ProblemConnectionModal from "../../components/problems/ProblemConnectionModal";
import CreateKnowledgeSpaceModal from "../../components/knowledgeSpaces/CreateKnowledgeSpaceModal";
import DomainConnectionSelector from "../../components/domains/DomainSelector";
import KnowledgeSpaceSelector from "../../components/knowledgeSpaces/KnowledgeSpaceSelector";
import OnClickDomainConnection from "../../components/domains/OnClickDomainConnection";

const ExpectedKnowledgeSpacePage = () => {
  const [domains, setDomains] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [connections, setConnections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [tests, setTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [problems, setProblems] = useState([]);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showCreateProblemModal, setShowCreateProblemModal] = useState(false);
  const [showProblemConnectionModal, setShowProblemConnectionModal] =
    useState(false);
  const [showDomainConnectionModal, setShowDomainConnectionModal] =
    useState(false);
  const [showCreateKSModal, setShowCreateKSModal] = useState(false);
  const [domainSelectorVisible, setDomainSelectorVisible] = useState(false);
  const [newDomainConnections, setNewDomainConnections] = useState([]);
  const [knowledgeSpaces, setKnowledgeSpaces] = useState([]);
  const [selectedKnowledgeSpace, setSelectedKnowledgeSpace] = useState(null);
  const [showOnClickDomainDialog, setShowOnClickDomainDialog] = useState(false);
  const [clickedDomain, setClickedDomain] = useState("");
  const params = useParams();

  const createNewProblem = (values) => {
    problemService
      .createProblem(values)
      .then((res) => setProblems([...problems, res.data]));
  };

  const addDomainConnection = (values) => {
    console.log(domains.filter((domain) => domain.id == values.target));
    const source = domains.filter((domain) => domain.id == values.source)[0];
    const destination = domains.filter(
      (domain) => domain.id == Number(values.target)
    )[0];

    setNewDomainConnections([
      ...newDomainConnections,
      {
        from_node: { name: source.name, id: source.id },
        to_node: { name: destination.name, id: destination.id },
      },
    ]);

    setConnections([
      ...connections,
      {
        from_node: { name: source.name, id: source.id },
        to_node: { name: destination.name, id: destination.id },
      },
    ]);

    // testService
    //   .createDomainConnection({
    //     from_node: values.source,
    //     to_node: values.target,
    //   })
    //   .then((res) =>
    //     setNewDomainConnections([...newDomainConnections, res.data])
    //   );
  };

  useEffect(async () => {
    const [
      testsResponse,
      domainsResponse,
      problemsResponse,
      knowledgeSpacesResponse,
    ] = await Promise.all([
      testService.getTestsForCourse(params.courseId),
      testService.getDomains(),
      problemService.getAllProblems(),
      testService.getAllKnowledgeSpaces(),
    ]);

    setTests(testsResponse.data.results);
    setDomains(domainsResponse.data.results);
    setProblems(problemsResponse.data.results);
    setKnowledgeSpaces(knowledgeSpacesResponse.data.results);
  }, [params.courseId]);

  const handleClick = (e) => {
    setClickedDomain(e);
    setShowOnClickDomainDialog(true);
  };

  const submitNewDomainConnectionOnClick = (value, questionMode) => {
    const selectedDomain =
      domains && domains.filter((domain) => clickedDomain === domain.name)[0];

    if (questionMode) {
      testService
        .mapDomainToQuestion(value.target, selectedDomain.id)
        .then(() => {
          const selectedQuestion =
            questions &&
            questions.filter((question) => question.id == value.target)[0];
          const otherQuestions =
            questions &&
            questions.filter((question) => question.id != value.target);
          selectedQuestion.domain = selectedDomain.id;
          setQuestions([...otherQuestions, selectedQuestion]);
        });
    } else
      addDomainConnection({
        source: selectedDomain.id,
        target: value.target,
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <div className="card">
                <div className="card-title d-flex justify-content-center mt-3">
                  <h3>Draw an expected knowledge space!</h3>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowCreateKSModal(true)}
                      disabled={
                        selectedTests.length === 0 &&
                        selectedDomains.length === 0
                      }
                    >
                      Save
                    </button>
                  </div>
                  {questions.length > 0 && selectedDomains.length > 0 && (
                    <D3canvas
                      domains={selectedDomains}
                      connections={connections}
                      questions={questions}
                      tests={selectedTests}
                      handleClick={(e) => handleClick(e)}
                    />
                  )}
                </div>
                {/* <div className="card-footer d-flex justify-content-center">
                   <button
                    className="btn btn-outline-success"
                    onClick={() => setDomainSelectorVisible(true)}
                  >
                    Add domain connection
                  </button> 
                </div> */}
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-sm">
              <DomainSelector
                domains={domains}
                selectedDomains={selectedDomains}
                setSelectedDomains={setSelectedDomains}
              />
            </div>
            <div className="col-sm">
              <KnowledgeSpaceSelector
                knowledgeSpaces={knowledgeSpaces}
                selectedKnowledgeSpace={selectedKnowledgeSpace}
                setSelectedKnowledgeSpace={setSelectedKnowledgeSpace}
                setSelectedTests={setSelectedTests}
                setConnections={setConnections}
                setSelectedQuestions={setQuestions}
                setSelectedDomains={setSelectedDomains}
                domains={domains}
                problems={problems}
                setSelectedProblems={setSelectedProblem}
              />
            </div>

            <div className="col-sm">
              <TestSelector
                tests={tests}
                selectedTests={selectedTests}
                setSelectedTests={setSelectedTests}
                setQuestions={setQuestions}
                questions={questions}
                setSelectedDomains={setSelectedDomains}
                selectedDomains={selectedDomains}
                domains={domains}
                setSelectedProblems={setSelectedProblems}
                selectedProblems={selectedProblems}
              />
            </div>
            <div className="col-sm">
              <ProblemSelector
                problems={problems}
                setSelectedProblems={setSelectedProblem}
                selectedProblems={selectedProblem}
                openNewProblemModal={() => setShowCreateProblemModal(true)}
              />
            </div>
          </div>
        </div>
      </div>
      <CreateProblemModal
        show={showCreateProblemModal}
        handleClose={() => setShowCreateProblemModal(false)}
        submit={(values) => createNewProblem(values)}
      ></CreateProblemModal>
      <ProblemConnectionModal
        show={showProblemConnectionModal}
        handleClose={() => setShowProblemConnectionModal(false)}
        problems={selectedProblems}
        tests={selectedTests}
      ></ProblemConnectionModal>
      <CreateKnowledgeSpaceModal
        show={showCreateKSModal}
        handleClose={() => setShowCreateKSModal(false)}
        selectedTests={selectedTests}
        newDomainConnections={newDomainConnections}
        selectedProblem={selectedProblem}
      ></CreateKnowledgeSpaceModal>
      <DomainConnectionSelector
        show={domainSelectorVisible}
        domains={domains}
        submit={addDomainConnection}
        handleClose={() => setDomainSelectorVisible(false)}
      ></DomainConnectionSelector>
      <OnClickDomainConnection
        show={showOnClickDomainDialog}
        handleClose={() => setShowOnClickDomainDialog(false)}
        domains={domains}
        selectedDomain={clickedDomain}
        questions={questions}
        handleSubmit={submitNewDomainConnectionOnClick}
      ></OnClickDomainConnection>
    </div>
  );
};

export default ExpectedKnowledgeSpacePage;
