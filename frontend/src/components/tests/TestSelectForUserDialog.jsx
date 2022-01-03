import React from "react";
import { Modal } from "react-bootstrap";

const TestSelectForUserDialog = ({
  show,
  handleClose,
  testHistories,
  studentId,
}) => {
  const renderSpecCol = () => (
    <>
      <th>View</th>
    </>
  );
  const renderTests = () =>
    testHistories.map((test, i) => (
      <>
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{test.test_name}</td>
          <td>
            <b>{test.total_points}</b> out of {test.max_points}
          </td>
          <a
            href={`knowledge-state/student/${studentId}/test/${test.test}/th/${test.id}`}
          >
            <button className="btn btn-success m-2">
              View knowledge state
            </button>
          </a>
        </tr>
      </>
    ));
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose test!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-responsive">
            <div className={`ml-5 mr-5`}>
              <table className={`table table-bordered`}>
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Test name</th>
                    <th>Points</th>

                    {renderSpecCol()}
                  </tr>
                </thead>
                <tbody>{renderTests()}</tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TestSelectForUserDialog;
