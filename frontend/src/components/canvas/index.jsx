import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Star, Text, Circle, Arrow } from "react-konva";
import { Button } from "react-bootstrap";
import CanvasMenu from "./CanvasMenu";
import QuestionPopup from "./QuestionPopup";
import testService from "../../services/tests/TestService";
import ProblemPopup from "./ProblemPopup";
import ConnectionPopup from "./ConnectionPopup";
import SaveCanvasPopup from "./SaveCanvasPopup";

const Canvas = ({
  domainsFromServer,
  questionsFromServer,
  connectionsFromServer,
  buttonsVisible,
  stateMode,
  correctAnswers,
  renderStateOnly,
}) => {
  const [questions, setQuestions] = React.useState([]);
  const [problems, setProblems] = useState([]);
  const [connections, setConnections] = useState([]);
  const [questionPopupVisible, setQuestionPopupVisible] = useState(false);
  const [problemPopupVisible, setProblemPopupVisible] = useState(false);
  const [connectionPopupVisible, setConnectionPopupVisible] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const [canvasPopupVisible, setCanvasPopupVisible] = useState(false);
  const stageRef = useRef(null);

  useEffect(() => {
    testService.getAllQuestions().then((res) => setAllQuestions(res.data));
    domainsFromServer &&
      domainsFromServer.forEach((domain) => addProblem(domain));

    questionsFromServer &&
      questionsFromServer.forEach((question) => {
        addQuestion(
          question,
          problems[
            problems.findIndex(
              (singleDomain) => singleDomain.id == question.domain_id
            )
          ]
        );
      });

    connectionsFromServer &&
      connectionsFromServer.forEach((connection) => {
        const pointA = problems.findIndex(
          (singleDomain) => singleDomain.id == connection.from_node.id
        );
        const pointB = problems.findIndex(
          (singleDomain) => singleDomain.id == connection.to_node.id
        );

        addConnection(pointA, pointB, false);
      });
  }, [connectionsFromServer, questionsFromServer, domainsFromServer]);

  // const [connections, setConnections] = useState(INITIAL_CONNECTIONS);
  // const generateConnections = () => {
  //   const arrows = [];
  //   for (let i = 1; i < 10; i++) {
  //     arrows.push({
  //       id: i.toString(),
  //       points: [stars[i - 1].x, stars[i - 1].y, stars[i].x, stars[i].y],
  //     });
  //   }

  //   return arrows;
  // };

  const questionAnsweredCorrectly = (questionId) =>
    correctAnswers.includes(questionId);

  const addQuestion = (question, problem) => {
    questions.push({
      id: question.id,
      x:
        problems.length > 0
          ? problem.x + random(-50, 50)
          : window.innerWidth / 2,
      y: problems.length > 0 ? problem.y + random(-50, 50) : random(50, 100),
      rotation: Math.random() * 180,
      isDragging: false,
      name: question.text,
    });
  };

  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const addProblem = (domain) => {
    problems.push({
      id: domain.id.toString(),
      x:
        problems.length > 0
          ? incrementX(
              problems[problems.length - 1].x,
              problems[problems.length - 1].y,
              250,
              250
            )
          : 100,
      y:
        problems.length > 0
          ? incrementY(problems[problems.length - 1].y, 250)
          : 50,
      rotation: Math.random() * 180,
      isDragging: false,
      name: domain.name,
    });
  };

  const incrementX = (previousX, previousY, stepX, stepY) => {
    return previousY + stepX > window.innerHeight
      ? previousX + stepY
      : problems[problems.length - 1].x;
  };

  const incrementY = (previousPt, step) => {
    return previousPt + step > window.innerHeight ? 0 : previousPt + step;
  };

  const handleCanvasSave = (name) => {
    const jsonStage = stageRef.current.toJSON();
    console.log(jsonStage);
  };

  const addConnection = (pointA, pointB, save) => {
    connections.push({
      id: (connections.length + 1).toString(),
      points: [
        problems[pointA].x,
        problems[pointA].y,
        problems[pointB].x,
        problems[pointB].y,
      ],
    });

    if (save) {
      testService.saveConnection({
        from_node: questions[pointA].id,
        to_node: questions[pointB].id,
      });
    }
  };

  const renderQuestions = (question) => {
    if (
      (renderStateOnly && questionAnsweredCorrectly(question.id)) ||
      !renderStateOnly
    )
      return (
        <>
          <Text text={question.name} x={question.x + 15} y={question.y + 15} />
          <Circle
            key={question.id}
            id={question.id}
            x={question.x}
            y={question.y}
            radius={20}
            numPoints={5}
            // innerRadius={20}
            // outerRadius={40}
            fill={`${
              stateMode && questionAnsweredCorrectly(question.id)
                ? "#29ff70"
                : "#3d72a6"
            }`}
            opacity={0.8}
            draggable
            rotation={question.rotation}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            shadowOffsetX={question.isDragging ? 10 : 5}
            shadowOffsetY={question.isDragging ? 10 : 5}
            scaleX={question.isDragging ? 1.2 : 1}
            scaleY={question.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        </>
      );
  };

  const handleDragStart = (e) => {
    const id = e.target.id();
    setQuestions(
      questions.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      })
    );
  };
  const handleDragEnd = (e) => {
    setQuestions(
      questions.map((star) => {
        return {
          ...star,
          isDragging: false,
        };
      })
    );
  };

  return (
    <div>
      {/* <Button
        style={{ position: "absolute", left: "80%", zIndex: 2 }}
        onClick={() => {
          stars.push({
            id: (stars.length + 1).toString(),
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotation: Math.random() * 180,
            isDragging: false,
            name: `Node #${stars.length + 1}`,
          });
        }}
      >
        Add a node
      </Button> */}

      {buttonsVisible && (
        <CanvasMenu
          addQuestion={() => setQuestionPopupVisible(true)}
          addProblem={() => setProblemPopupVisible(true)}
          addConnection={() => setConnectionPopupVisible(true)}
          saveCanvas={() => setCanvasPopupVisible(true)}
        />
      )}
      {allQuestions && problems && (
        <QuestionPopup
          show={questionPopupVisible}
          setShow={setQuestionPopupVisible}
          allQuestions={allQuestions}
          submit={addQuestion}
          allProblems={problems}
        />
      )}
      <ProblemPopup
        show={problemPopupVisible}
        setShow={setProblemPopupVisible}
        addProblem={addProblem}
      />
      {questions && (
        <ConnectionPopup
          show={connectionPopupVisible}
          setShow={setConnectionPopupVisible}
          allQuestions={questions}
          addConnection={addConnection}
        />
      )}
      <SaveCanvasPopup
        show={canvasPopupVisible}
        setShow={setCanvasPopupVisible}
        saveCanvas={handleCanvasSave}
      />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ overflowX: "auto" }}
        ref={stageRef}
      >
        {questions && (
          <Layer>{questions.map((star) => renderQuestions(star))}</Layer>
        )}
        <Layer>
          {connections.map((connection) => (
            <Arrow
              points={connection.points}
              key={connection.id}
              id={connection.id}
              pointerLength={10}
              pointerWidth={10}
              fill="black"
              stroke="black"
              strokeWidth={4}
              opacity={0.6}
            />
          ))}
        </Layer>
        <Layer>
          {problems.map((problem) => (
            <>
              <Text text={problem.name} x={problem.x + 50} y={problem.y + 50} />
              <Circle
                key={problem.id}
                id={problem.id}
                x={problem.x}
                y={problem.y}
                radius={100}
                numPoints={5}
                // innerRadius={20}
                // outerRadius={40}
                fill="#3d72a6"
                opacity={0.4}
                draggable
                rotation={problem.rotation}
                shadowColor="black"
                shadowBlur={10}
                shadowOpacity={0}
                shadowOffsetX={problem.isDragging ? 10 : 5}
                shadowOffsetY={problem.isDragging ? 10 : 5}
                scaleX={problem.isDragging ? 1.2 : 1}
                scaleY={problem.isDragging ? 1.2 : 1}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            </>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
