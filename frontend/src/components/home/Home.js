import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { getDecodedJWT } from "../../utils/LocalStorage";

export default () => {
  const [tests, setTests] = useState([]);
  const [isStaff, setIsStaff] = useState(getDecodedJWT()["is_staff"]);
  const [isAdmin, setIsAdmin] = useState(getDecodedJWT()["is_superuser"]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/tests/")
      .then((response) => {
        setTests(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
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

  const renderSpecActions = (test) => {
    console.log(isStaff);
    if (isAdmin) {
      return (
        <td>
          <button className={`btn btn-danger`}>Delete</button>
        </td>
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
        {/* <th>Actions</th> */}
        <th>Knowledge space</th>
      </>
    );
    // }
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Testovi:</h6>
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
  );
};
