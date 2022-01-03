import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { getDecodedJWT } from "../../utils/LocalStorage";
import studentService from "../../services/users/StudentService";
import TestSelectForUserDialog from "../tests/TestSelectForUserDialog";
import testService from "../../services/tests/TestService";

export default () => {
  const [tests, setTests] = useState([]);
  const [students, setStudents] = useState([]);
  const [testHistoriesForStudent, setTestHistoriesForStudent] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isStaff, setIsStaff] = useState(
    getDecodedJWT() && getDecodedJWT()["is_staff"]
  );
  const [isAdmin, setIsAdmin] = useState(
    getDecodedJWT() && getDecodedJWT()["is_superuser"]
  );
  const [showTestSelect, setShowTestSelect] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/tests/")
      .then((response) => {
        setTests(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });

    studentService
      .getAllStudents()
      .then((response) => setStudents(response.data));
  }, []);

  const renderTests = () => {
    return tests.map((t, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{t.identifier}</td>
          <td>{t.author.first_name}</td>
          <td>{t.author.last_name}</td>
          <td>{t.author.email}</td>
          {renderSpecActions(t)}
        </tr>
      );
    });
  };

  const renderStudents = () =>
    students &&
    students.map((student, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{student.first_name}</td>
        <td>{student.last_name}</td>
        <td>{student.email}</td>
        <td>
          <button
            className="btn btn-success"
            onClick={() => {
              setShowTestSelect(true);
              testService.getTestHistoriesForStudent(student.id).then((res) => {
                setTestHistoriesForStudent(res.data);
                setSelectedStudentId(student.id);
              });
            }}
          >
            View state
          </button>
        </td>
      </tr>
    ));

  const renderSpecActions = (test) => {
    if (isAdmin) {
      return (
        <>
          <td>
            <button className={`btn btn-danger`}>Delete</button>
          </td>
          <td>
            <a
              className={`btn btn-success`}
              href={`knowledge-spaces/${test.id}`}
            >
              View knowledge space
            </a>
          </td>
          <td>
            <a className={`btn btn-success`} href={`take-test/${test.id}`}>
              Take test
            </a>
          </td>
        </>
      );
    }
    if (!isAdmin && !isStaff) {
      return (
        <td>
          <a className={`btn btn-success`}>Take test</a>
        </td>
      );
    }

    if (isStaff) {
      return (
        <td>
          <a className={`btn btn-success`} href={`knowledge-spaces/${test.id}`}>
            View knowledge space
          </a>
        </td>
      );
    }
  };

  const renderSpecCol = () => {
    // if ((roles && isAdmin) || (!isStaff && !isAdmin)) {
    return (
      <>
        <th>Actions</th>
        <th>Knowledge space</th>
        <th>Take test</th>
      </>
    );
    // }
  };

  return (
    <>
      <TestSelectForUserDialog
        show={showTestSelect}
        handleClose={() => {
          setShowTestSelect(false);
        }}
        testHistories={testHistoriesForStudent}
        studentId={selectedStudentId}
      ></TestSelectForUserDialog>
      <div className="card shadow mb-4 ml-2 mr-2">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Tests:</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div className={`ml-5 mr-5`}>
              <table className={`table table-bordered`}>
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Test name</th>
                    <th>Author name</th>
                    <th>Author last name</th>
                    <th>E-mail</th>

                    {renderSpecCol()}
                  </tr>
                </thead>
                <tbody>{renderTests()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {(isStaff || isAdmin) && (
        <div className="card shadow mb-4 ml-2 mr-2">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Students:</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <div className={`ml-5 mr-5`}>
                <table className={`table table-bordered`}>
                  <thead>
                    <tr>
                      <th>Number</th>
                      <th>First name</th>
                      <th>Last name</th>
                      <th>E-mail</th>
                      <th>Knowledge state</th>
                    </tr>
                  </thead>
                  <tbody>{renderStudents()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
