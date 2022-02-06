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
import jwtDecode from "jwt-decode";

export default () => {
  const [course, setCourse] = useState(null);
  const [tests, setTests] = useState([]);
  const [students, setStudents] = useState([]);
  const [testHistoriesForStudent, setTestHistoriesForStudent] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isStaff, setIsStaff] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showTestSelect, setShowTestSelect] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [template, setTemplate] = useState("");
  const [testHistoriesForUser, setTestHistoriesForUser] = useState([]);
  const params = useParams();

  useEffect(async () => {
    setCourse(params.courseId);
    loadData(params);
    setIsStaff(checkRole("is_staff"));
    setIsAdmin(checkRole("is_superuser"));
  }, [params]);

  const checkRole = (role) => {
    const item = localStorage.getItem("token");
    if (!item) return false;

    const access = jwtDecode(item);
    console.log(!!access[role]);
    if (access) return access[role];
    return false;
  };

  const loadData = async (params) => {
    const [testsServer, studentsServer, testHistoriesServer] =
      await Promise.all([
        testService.getTestsForCourse(params.courseId),
        studentService.getStudentsForCourse(params.courseId),
        testService.getTestHistoriesById(params.courseId),
      ]);

    setTests(setVisibleTests(testsServer, testHistoriesServer.data));
    setStudents(studentsServer.data);
    setTestHistoriesForUser(testHistoriesServer.data);
  };

  const setVisibleTests = (testsServer, testHistories) => {
    const sorted = testsServer.data.results.sort((a, b) =>
      a.expiration_date > b.expiration_date ? 1 : -1
    );

    const testHistoryIds = testHistories.map((th) => th.test);
    return checkRole("is_superuser")
      ? sorted
      : sorted.filter((test) => !testHistoryIds.includes(test.id));
  };

  const renderTestHistoriesForStudent = () =>
    testHistoriesForUser &&
    testHistoriesForUser.map((th, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{th.test_name}</td>
        <td>
          <b>{th.total_points}</b> out of {th.max_points}
        </td>
      </tr>
    ));

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
              testService
                .getTestHistoriesForStudent(student.id, course)
                .then((res) => {
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
      setTemplate(res.data);
      setShowTemplateDialog(true);
      // const url = window.URL.createObjectURL(res.data);
      // let a = document.createElement("a");
      // a.href = res.data.template_url;
      // a.download = res.data.template_name;
      // a.click();
    });
  };

  const testActive = (test) =>
    new Date(test.start_date) < new Date() &&
    new Date() < new Date(test.expiration_date);

  const sortByCKS = (test) => {
    testService.sortByCKS(test.id, !test.sort_by_computed_ks).then((res) => {
      const updated = test;
      updated.sort_by_computed_ks = res.data.sort_by_computed_ks;
      setTests(
        [...tests.filter((test) => test.id !== updated.id), updated].sort(
          (a, b) => (a.expiration_date > b.expiration_date ? 1 : -1)
        )
      );
    });
  };

  const renderTestNotActiveText = (test) => {
    if (new Date(test.start_date) > new Date())
      return `Test starts: ${new Date(
        test.start_date
      ).toLocaleDateString()} ${new Date(
        test.start_date
      ).toLocaleTimeString()}`;

    if (new Date(test.expiration_date) < new Date())
      return `Test expired: ${new Date(
        test.expiration_date
      ).toLocaleDateString()} ${new Date(
        test.expiration_date
      ).toLocaleTimeString()}`;
  };

  const renderSpecActions = (test) => {
    if (isAdmin) {
      return (
        <>
          <td>
            <a
              className={`btn btn-success`}
              href={`../knowledge-spaces/${test.id}`}
            >
              View knowledge space
            </a>
          </td>
          <td>
            {testActive(test) ? (
              <a
                className={`btn btn-success`}
                href={`../take-test/${test.id}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={`Expires: ${new Date(
                  test.expiration_date
                ).toLocaleDateString()}, ${new Date(
                  test.expiration_date
                ).toLocaleTimeString()}`}
              >
                Take test
              </a>
            ) : (
              <span className="text-muted">
                {renderTestNotActiveText(test)}
              </span>
            )}
          </td>
          <td>
            <div className="d-flex flex-direction-column justify-content-center align-items-center">
              <button
                className={`btn btn-${
                  test.sort_by_computed_ks ? "success" : "primary"
                }`}
                onClick={() => sortByCKS(test)}
              >
                {test.sort_by_computed_ks ? "Enabled" : "Disabled"}
              </button>
            </div>
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
        <th>Knowledge space</th>
        <th>Take test</th>
        <th>Sort by computed ks</th>
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
      <div className="d-flex justify-content-center mt-5 mb-5">
        <h2>Welcome!</h2>
      </div>
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
      <div className="card shadow mb-4 ml-2 mr-2">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Test histories:</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div className={`ml-5 mr-5`}>
              <table className={`table table-bordered`}>
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Test name</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>{renderTestHistoriesForStudent()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
