import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import testService from "../../services/tests/TestService";
import Canvas from "../../components/canvas";
import D3canvas from "../../components/canvas/D3canvas";

const KnowledgeSpacePage = () => {
  const { testId } = useParams();
  const [computedKnowledgeSpace, setComputedKnowledgeSpace] = useState([]);
  const [drawnKnowledgeSpace, setDrawnKnowledgeSpace] = useState([]);
  const [comparisonMode, setComparisonMode] = useState(false);
  useEffect(() => {
    if (testId) {
      testService.getKnowledgeSpacesForTest(testId).then((res) => {
        setComputedKnowledgeSpace(res.data["computed"]);
        setDrawnKnowledgeSpace(res.data["drawn"]);
      });
    }
  }, [testId]);

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
          <Canvas
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
          ></Canvas>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeSpacePage;
