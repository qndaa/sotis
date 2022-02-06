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
  tests,
  problems,
  handleClick,
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
    console.log(domains);
    console.log(connections);
    console.log(questions);
    const nodes =
      domains && connections
        ? domains
            .map((domain) => {
              return { id: domain.name, infoId: domain.id, isQuestion: false };
            })
            .concat(
              questions.map((question) => {
                return {
                  id: question.text,
                  infoId: question.id,
                  symbolType: "square",
                  isQuestion: true,
                  color: calculateStateOnly(question),
                };
              })
            )
        : [];
    if (tests) {
      nodes.concat(
        tests.map((test) => {
          return {
            id: test.identifier,
            infoId: test.id,
            symbolType: "triangle",
            color: "#b642f5",
          };
        })
      );
    }
    // if (problems) {
    //   nodes.concat(
    //     problems &&
    //       problems.map((problem) => {
    //         return {
    //           id: problem.name,
    //           infoId: problem.id,
    //           symbolType: "diamond",
    //           color: "#b642f5",
    //         };
    //       })
    //   );
    // }

    let links = connections
      ? connections.map((connection) => {
          return {
            source: connection.from_node.name,
            target: connection.to_node.name,
          };
        })
      : [];

    if (questions) {
      let questionDomainConnections = [];
      for (let question of questions) {
        const target = domains.filter(
          (domain) =>
            domain.id === question.domain_id || domain.id === question.domain
        );
        console.log(target);
        if (target.length != 0) {
          questionDomainConnections.push({
            source: question.text,
            target: target[0].name,
          });
        }
      }
      links = links.concat(questionDomainConnections);
    }
    links = links.concat(calculateTQConnections()).filter((connection) => {
      const nodeIds = nodes.map((node) => node.id);
      if (connection)
        return (
          nodeIds.includes(connection.source) &&
          nodeIds.includes(connection.target)
        );
    });
    console.warn(links);

    setData({
      nodes: nodes,
      links: links,
    });
    setRenderable(true);

    console.log(data);
  }, [domains, connections, questions, renderStateOnly]);

  const getQuestionsForTest = (test) =>
    test.questions || extractQuestions(test);

  const extractQuestions = (test) => {
    const sections = test.sections;
    let questions = [];
    sections && sections.map((section) => questions.concat(section.questions));
    return questions;
  };

  const calculateTQConnections = () => {
    const connections = [];
    tests &&
      tests.forEach((test) => {
        getQuestionsForTest(test).forEach((question) => {
          connections.push({
            source: test.identifier,
            target: question.text,
            color: "#b642f5",
          });
        });
      });

    return connections;
  };

  const renderGraph = () => {
    if (renderable) {
      console.log(data);
      return (
        data && (
          <Graph
            id="graph-id" // id is mandatory
            data={data ? data : mockData}
            config={myConfig}
            onClickNode={onClickNode}
            onClickLink={onClickLink}
          />
        )
      );
    }
  };

  // the graph configuration, just override the ones you need
  const myConfig = {
    automaticRearrangeAfterDropNode: true,
    collapsible: false,
    directed: false,
    focusAnimationDuration: 0.75,
    focusZoom: 1,
    freezeAllDragEvents: false,
    height: 400,
    highlightDegree: 2,
    highlightOpacity: 0.2,
    linkHighlightBehavior: true,
    maxZoom: 12,
    minZoom: 0.05,
    nodeHighlightBehavior: true,
    panAndZoom: false,
    staticGraph: false,
    staticGraphWithDragAndDrop: false,
    width: 800,
    d3: {
      alphaTarget: 0.05,
      gravity: -250,
      linkLength: 120,
      linkStrength: 2,
      disableLinkForce: false,
    },
    node: {
      color: "#d3d3d3",
      fontColor: "black",
      fontSize: 10,
      fontWeight: "normal",
      highlightColor: "red",
      highlightFontSize: 14,
      highlightFontWeight: "bold",
      highlightStrokeColor: "red",
      highlightStrokeWidth: 1.5,
      mouseCursor: "crosshair",
      opacity: 0.9,
      renderLabel: true,
      size: 200,
      strokeColor: "none",
      strokeWidth: 1.5,
      svg: "",
      symbolType: "circle",
    },
    link: {
      color: "lightgray",
      fontColor: "black",
      fontSize: 8,
      fontWeight: "normal",
      highlightColor: "red",
      highlightFontSize: 8,
      highlightFontWeight: "normal",
      labelProperty: "label",
      mouseCursor: "pointer",
      opacity: 1,
      renderLabel: false,
      semanticStrokeWidth: true,
      strokeWidth: 3,
      markerHeight: 6,
      markerWidth: 6,
      strokeDasharray: 0,
      strokeDashoffset: 0,
      strokeLinecap: "butt",
    },
  };

  const onClickNode = function (nodeId) {
    const selectedNode =
      data && data.nodes.filter((node) => node.id == nodeId)[0];
    if (!selectedNode.isQuestion) handleClick(nodeId);
    else alert("You can only click on a domain or a connection!");
  };

  const onClickLink = function (source, target) {
    alert(`Clicked link between ${source} and ${target}`);
  };
  return <div>{renderGraph()}</div>;
};

export default D3canvas;
