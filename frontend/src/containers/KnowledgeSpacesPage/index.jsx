import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import testService from "../../services/tests/TestService";
import Canvas from "../../components/canvas";
import D3canvas from "../../components/canvas/D3canvas";
import AddConnectionDialog from "../../components/canvas/AddConnectionDialog";
import { useSelector } from "react-redux";

const KnowledgeSpacePage = () => {
  const { testId } = useParams();
  const [computedKnowledgeSpace, setComputedKnowledgeSpace] = useState([]);
  const [drawnKnowledgeSpace, setDrawnKnowledgeSpace] = useState([]);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [showConnectionDialog, setConnectionDialog] = useState(false);
  const courseId = useSelector((state) => state.courses.selectedCourse);

  useEffect(() => {
    if (testId) {
      testService.getKnowledgeSpacesForTest(testId).then((res) => {
        setComputedKnowledgeSpace(res.data["computed"]);
        setDrawnKnowledgeSpace(res.data["drawn"]);
      });
    }
  }, [testId]);

  const addConnection = (connection) => {
    testService
      .createDomainConnection({
        from_node: connection.from_node,
        to_node: connection.to_node,
        course: courseId,
        knowledge_space: drawnKnowledgeSpace.id,
      })
      .then((res) => {
        const newKS = drawnKnowledgeSpace;
        newKS["domain_connections"] = [
          ...drawnKnowledgeSpace.domain_connections,
          res.data,
        ];
        console.log(newKS);
        setDrawnKnowledgeSpace(newKS);
      });
  };

  const inBothConnections = () => {
    const drawnIds = drawnKnowledgeSpace.domain_connections.map(
      (connection) => connection.id
    );
    const computedIds = computedKnowledgeSpace.domain_connections.map(
      (connection) => connection.id
    );

    const idsInBoth = computedIds.filter((id) => drawnIds.includes(id));
    return computedKnowledgeSpace.domain_connections.filter((connection) =>
      idsInBoth.includes(connection.id)
    );
  };

  const inBothQuestions = () => {
    const drawnIds = drawnKnowledgeSpace.questions.map(
      (question) => question.id
    );
    const computedIds = computedKnowledgeSpace.questions.map(
      (question) => question.id
    );

    const idsInBoth = computedIds.filter((id) => drawnIds.includes(id));
    return computedKnowledgeSpace.questions.filter((question) =>
      idsInBoth.includes(question.id)
    );
  };

  const inComputedConnections = () => {
    const drawnIds = drawnKnowledgeSpace.domain_connections.map(
      (connection) => connection.id
    );

    return computedKnowledgeSpace.domain_connections.filter(
      (connection) => !drawnIds.includes(connection.id)
    );
  };

  const inComputedQuestions = () => {
    const drawnIds = drawnKnowledgeSpace.questions.map(
      (question) => question.id
    );

    return computedKnowledgeSpace.questions.filter(
      (question) => !drawnIds.includes(question.id)
    );
  };

  const inExpectedConnections = () => {
    const computedIds = computedKnowledgeSpace.domain_connections.map(
      (connection) => connection.id
    );

    return drawnKnowledgeSpace.domain_connections.filter(
      (connection) => !computedIds.includes(connection.id)
    );
  };

  const inExpectedQuestions = () => {
    const computedIds = computedKnowledgeSpace.questions.map(
      (question) => question.id
    );

    return drawnKnowledgeSpace.questions.filter(
      (question) => !computedIds.includes(question.id)
    );
  };

  const filterQuestions = () => {
    const questionIds = computedKnowledgeSpace.questions
      .map((question) => question.id)
      .filter((question) =>
        drawnKnowledgeSpace.questions
          .map((question) => question.id)
          .includes(question)
      );
    return computedKnowledgeSpace.questions.filter((question) =>
      questionIds.includes(question.id)
    );
  };

  const calculateDomains = () =>
    comparisonMode
      ? computedKnowledgeSpace.domains.filter((domain) =>
          drawnKnowledgeSpace.domains.includes(domain)
        )
      : computedKnowledgeSpace.domains;
  return (
    <div>
      <div className="ml-2">
        <div>
          <h2 className="mb-5">Computed</h2>
          <D3canvas
            domains={computedKnowledgeSpace && computedKnowledgeSpace.domains}
            questions={
              computedKnowledgeSpace && computedKnowledgeSpace.questions
            }
            connections={
              computedKnowledgeSpace &&
              computedKnowledgeSpace.domain_connections
            }
          ></D3canvas>
        </div>
        <div>
          <h2 className="mb-5">In expected and computed</h2>
          <D3canvas
            domains={computedKnowledgeSpace && computedKnowledgeSpace.domains}
            questions={
              computedKnowledgeSpace &&
              drawnKnowledgeSpace.questions &&
              inBothQuestions()
            }
            connections={
              computedKnowledgeSpace &&
              drawnKnowledgeSpace.connections &&
              inBothConnections()
            }
          ></D3canvas>
        </div>
        <div>
          <h2 className="mb-5">Only in computed</h2>
          <D3canvas
            domains={computedKnowledgeSpace && computedKnowledgeSpace.domains}
            questions={
              computedKnowledgeSpace &&
              drawnKnowledgeSpace.questions &&
              inComputedQuestions()
            }
            connections={
              computedKnowledgeSpace &&
              drawnKnowledgeSpace.connections &&
              inComputedConnections()
            }
          ></D3canvas>
        </div>
        <div>
          <h2 className="mb-5">Only in expected</h2>
          {computedKnowledgeSpace &&
          drawnKnowledgeSpace.questions &&
          inExpectedQuestions() ? (
            <D3canvas
              domains={computedKnowledgeSpace && computedKnowledgeSpace.domains}
              questions={
                computedKnowledgeSpace &&
                drawnKnowledgeSpace.questions &&
                inExpectedQuestions()
              }
              connections={
                computedKnowledgeSpace &&
                drawnKnowledgeSpace.connections &&
                inExpectedConnections()
              }
            ></D3canvas>
          ) : (
            <span>No items</span>
          )}
        </div>
        <div>
          <h2 className="mb-5">Drawn</h2>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setConnectionDialog(true)}
          >
            Add connection
          </button>
          <D3canvas
            domains={drawnKnowledgeSpace && drawnKnowledgeSpace.domains}
            connections={
              drawnKnowledgeSpace && drawnKnowledgeSpace.domain_connections
            }
            questions={drawnKnowledgeSpace && drawnKnowledgeSpace.questions}
          ></D3canvas>
          {/* <Canvas
            buttonsVisible={false}
            domainsFromServer={
              drawnKnowledgeSpace && drawnKnowledgeSpace.domains
            }
            questionsFromServer={
              drawnKnowledgeSpace && drawnKnowledgeSpace.questions
            }
            connectionsFromServer={
              drawnKnowledgeSpace && drawnKnowledgeSpace.domain_connections
            }
          ></Canvas> */}
          <AddConnectionDialog
            show={showConnectionDialog}
            setShow={setConnectionDialog}
            submit={addConnection}
            domains={
              drawnKnowledgeSpace && [...new Set(drawnKnowledgeSpace.domains)]
            }
          ></AddConnectionDialog>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeSpacePage;
