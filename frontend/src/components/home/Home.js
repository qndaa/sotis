import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { getDecodedJWT } from "../../utils/LocalStorage";
import studentService from "../../services/users/StudentService";
import TestSelectForUserDialog from "../tests/TestSelectForUserDialog";
import testService from "../../services/tests/TestService";
import QtiDialog from "./QtiDialog";
import { useParams } from "react-router-dom";

export default () => {
  const [course, setCourse] = useState(null);
  const [tests, setTests] = useState([]);
  const [students, setStudents] = useState([]);
  const [testHistoriesForStudent, setTestHistoriesForStudent] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isStaff, setIsStaff] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [showTestSelect, setShowTestSelect] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [template, setTemplate] = useState("");
  const params = useParams();

  useEffect(async () => {
    setCourse(params.courseId);
    const [testsServer, studentsServer] = await Promise.all([
      testService.getTestsForCourse(params.courseId),
      studentService.getStudentsForCourse(params.courseId),
    ]);

    setTests(testsServer.data.results);
    setStudents(studentsServer.data);
  }, [params]);

  const renderTests = () => {
    return (
      tests &&
      tests.map((t, i) => {
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
      })
    );
  };

  const renderStudents = () =>
    // studentService.getAllStudents().then((res) => {
    // const students = res.data;
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
              console.log("HERE");
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
  // });

  const getQti = (testId) => {
    testService.getQti(testId).then((res) => {
      console.log(template);
      setTemplate(res.data.template);
      setShowTemplateDialog(true);
    });
  };

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
          <td>
            <button
              onClick={() => getQti(test.id)}
              className={`btn btn-success`}
            >
              Get XML
            </button>
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
        <th>Get QTI</th>
      </>
    );
    // }
  };

  return (
    <>
      <QtiDialog
        show={showTemplateDialog}
        setShow={setShowTemplateDialog}
        template={template}
      ></QtiDialog>
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
