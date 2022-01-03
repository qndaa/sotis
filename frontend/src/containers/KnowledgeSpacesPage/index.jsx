import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import testService from "../../services/tests/TestService";
import Canvas from "../../components/canvas";

const KnowledgeSpacePage = () => {
  const { testId } = useParams();
  const [computedKnowledgeSpace, setComputedKnowledgeSpace] = useState([]);
  const [drawnKnowledgeSpace, setDrawnKnowledgeSpace] = useState([]);
  useEffect(() => {
    if (testId) {
      testService.getKnowledgeSpacesForTest(testId).then((res) => {
        setComputedKnowledgeSpace(res.data["computed"]);
        setDrawnKnowledgeSpace(res.data["drawn"]);
      });
    }
  }, [testId]);
  return (
    <div>
      <div className="ml-2">
        <div>
          <h2 className="mb-5">Computed</h2>
          <Canvas
            buttonsVisible={false}
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
          ></Canvas>
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
