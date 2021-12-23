import React from "react";
import { Button } from "react-bootstrap";

const CanvasMenu = ({ addQuestion, addProblem, addConnection, saveCanvas }) => {
  return (
    <div
      style={{
        dispay: "grid",
        gridTemplateColumns: "auto auto auto auto",
        columnGap: "5%",
        backgroundColor: "ghostwhite",
      }}
    >
      <Button variant="outline-info" onClick={addProblem}>
        Add a problem
      </Button>
      <Button variant="outline-info" onClick={addQuestion}>
        Add a question
      </Button>
      <Button variant="outline-info" onClick={addConnection}>
        Add a connection
      </Button>
      <Button variant="outline-info" onClick={saveCanvas}>
        Save canvas
      </Button>
    </div>
  );
};

export default CanvasMenu;
