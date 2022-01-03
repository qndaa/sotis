import React, { useState, useEffect } from "react";
import Canvas from "../../components/canvas";
import testService from "../../services/tests/TestService";
import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import D3canvas from "../../components/canvas/D3canvas";

const KnowledgeStatePage = () => {
  const { studentId, testId, testHistoryId } = useParams();
  const [computedKnowledgeSpace, setComputedKnowledgeSpace] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [renderStateOnly, setRenderStateOnly] = useState(false);

  useEffect(() => {
    if (testId) {
      testService.getKnowledgeSpacesForTest(testId).then((res) => {
        setComputedKnowledgeSpace(res.data["computed"]);
      });
      testService
        .getCorrectAnswersForStudent(studentId, testHistoryId)
        .then((res) => {
          setCorrectAnswers(res.data["correct_answers"]);
        });
    }
  }, [studentId, testHistoryId]);
  return (
    <div>
      <div className="ml-2">
        <div>
          <h2 className="mb-5">Knowledge state vs expected knowledge space</h2>
          <button
            className={`btn ${
              renderStateOnly ? "btn-primary" : "btn-success"
            } mb-5`}
            onClick={() => setRenderStateOnly(!renderStateOnly)}
          >{`${
            renderStateOnly
              ? "View expected state"
              : "View only correct answers"
          }`}</button>
          {/* <Canvas
            renderStateOnly={renderStateOnly}
            buttonsVisible={false}
            stateMode={true}
            correctAnswers={correctAnswers}
            domainsFromServer={
              computedKnowledgeSpace && computedKnowledgeSpace.domains
            }
            questionsFromServer={
              computedKnowledgeSpace && computedKnowledgeSpace.questions
            }
            connectionsFromServer={
              computedKnowledgeSpace &&
              computedKnowledgeSpace.domain_connections
            }
          ></Canvas> */}
          <D3canvas
            renderStateOnly={renderStateOnly}
            stateMode={true}
            correctAnswers={correctAnswers}
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
      </div>
    </div>
  );
};

export default KnowledgeStatePage;
