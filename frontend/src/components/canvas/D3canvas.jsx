import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Graph } from "react-d3-graph";

const D3canvas = ({
  questions,
  domains,
  connections,
  stateMode,
  correctAnswers,
  renderStateOnly,
}) => {
  const [data, setData] = useState(null);
  const [renderable, setRenderable] = useState(false);
  const mockData = {
    nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
    links: [
      { source: "Harry", target: "Sally" },
      { source: "Harry", target: "Alice" },
    ],
  };

  const calculateStateOnly = (question) => {
    if (stateMode && renderStateOnly)
      return correctAnswers.includes(question.id)
        ? "lightgreen"
        : "transparent";
    else if (stateMode) {
      return correctAnswers.includes(question.id) ? "lightgreen" : "lightblue";
    } else return "lightblue";
  };

  useEffect(() => {
    domains &&
      connections &&
      questions &&
      setData({
        nodes: domains
          .map((domain) => {
            return { id: domain.name, infoId: domain.id, isQuestion: false };
          })
          .concat(
            questions.map((question) => {
              return {
                id: question.text,
                infoId: question.id,
                symbolType: "square",
                color: calculateStateOnly(question),
              };
            })
          ),
        links: connections
          .map((connection) => {
            return {
              source: connection.from_node.name,
              target: connection.to_node.name,
            };
          })
          .concat(
            questions.map((question) => {
              return {
                source: question.text,
                target: domains.filter(
                  (domain) => domain.id === question.domain_id
                )[0].name,
              };
            })
          ),
      });
    setRenderable(true);
  }, [domains, connections, questions, renderStateOnly]);

  const renderGraph = () => {
    if (renderable) {
      console.log(data);
      return (
        <Graph
          id="graph-id" // id is mandatory
          data={data ? data : mockData}
          config={myConfig}
          onClickNode={onClickNode}
          onClickLink={onClickLink}
        />
      );
    }
  };

  // the graph configuration, just override the ones you need
  const myConfig = {
    automaticRearrangeAfterDropNode: false,
    collapsible: false,
    directed: false,
    focusAnimationDuration: 0.75,
    focusZoom: 1,
    freezeAllDragEvents: false,
    height: 400,
    highlightDegree: 1,
    highlightOpacity: 1,
    linkHighlightBehavior: false,
    maxZoom: 10,
    minZoom: 0.1,
    nodeHighlightBehavior: false,
    panAndZoom: false,
    staticGraph: false,
    staticGraphWithDragAndDrop: false,
    width: 800,
    d3: {
      alphaTarget: 0.05,
      gravity: -100,
      linkLength: 100,
      linkStrength: 1,
      disableLinkForce: false,
    },
    node: {
      color: "lightblue",
      fontColor: "black",
      fontSize: 8,
      fontWeight: "normal",
      highlightColor: "SAME",
      highlightFontSize: 8,
      highlightFontWeight: "normal",
      highlightStrokeColor: "SAME",
      highlightStrokeWidth: "SAME",
      labelProperty: "id",
      mouseCursor: "pointer",
      opacity: 1,
      renderLabel: true,
      size: 200,
      strokeColor: "none",
      strokeWidth: 1.5,
      svg: "",
      symbolType: "circle",
    },
    link: {
      color: "#d3d3d3",
      fontColor: "black",
      fontSize: 8,
      fontWeight: "normal",
      highlightColor: "SAME",
      highlightFontSize: 8,
      highlightFontWeight: "normal",
      labelProperty: "label",
      mouseCursor: "pointer",
      opacity: 1,
      renderLabel: false,
      semanticStrokeWidth: false,
      strokeWidth: 1.5,
      markerHeight: 6,
      markerWidth: 6,
      strokeDasharray: 0,
      strokeDashoffset: 0,
      strokeLinecap: "butt",
    },
  };

  const onClickNode = function (nodeId) {
    alert(`Clicked node ${nodeId}`);
  };

  const onClickLink = function (source, target) {
    alert(`Clicked link between ${source} and ${target}`);
  };
  return <div>{renderGraph()}</div>;
};

export default D3canvas;
