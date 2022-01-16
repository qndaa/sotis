import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSections, saveTest } from "../store/actions/tests";
import AllSectionsTable from "./AllSectionsTable";
import { Formik, Form, Field } from "formik";
import testService from "../../services/tests/TestService";

const CreateNewTest = () => {
  const dispatch = useDispatch();
  const [testTitle, setTestTitle] = useState("");
  const [selectedSections, setSelectedSections] = useState([]);
  const allSections = useSelector((state) => state.tests.allSections);
  const selectedCourse = useSelector((state) => state.courses.selectedCourse);

  useEffect(() => {
    dispatch(fetchAllSections());
  }, []);

  const handleTestSave = (values) => {
    const selectedIds = [];
    allSections.forEach(
      (section, index) =>
        selectedSections[index] && selectedIds.push(section.id)
    );

    testService.saveTest({
      identifier: values.testTitle,
      sections: selectedIds,
      course: selectedCourse,
      start_date: values.startDate,
      expiration_date: values.expirationDate,
    });
    setSelectedSections([]);
  };

  allSections.forEach(() => selectedSections.push(false));

  return (
    <div className="row justify-content-center p-5">
      <div className="col-xl-10 col-lg-12 col-md-9 mt-5">
        <div className=" o-hidden border-0 my-5">
          <div className="card-body p-0">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Create a test!</h1>
                  </div>
                  <Formik
                    initialValues={{
                      testTitle: "",
                      startDate: "",
                      expirationDate: "",
                    }}
                    onSubmit={(values, { resetForm }) => {
                      handleTestSave(values);
                      resetForm();
                    }}
                  >
                    <Form>
                      <div className="form-group">
                        <Field
                          type="text"
                          className={`form-control form-control-user`}
                          id="testTitle"
                          placeholder="Enter test title here!"
                          autoComplete={`false`}
                          name="testTitle"
                          required={true}
                        ></Field>
                      </div>
                      <div className="form-group">
                        <div className="d-flex justify-content-center">
                          <label>Available</label>
                        </div>
                        <div className="form-group">
                          <label>From:</label>
                          <Field
                            type="datetime-local"
                            className={`form-control form-control-user`}
                            id="startDate"
                            name="startDate"
                            required={true}
                          ></Field>
                        </div>
                        <div className="form-group">
                          <label>To:</label>
                          <Field
                            type="datetime-local"
                            className={`form-control form-control-user`}
                            id="expirationDate"
                            name="expirationDate"
                            required={true}
                          ></Field>
                        </div>
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <button className="btn btn-primary">Save</button>
                      </div>
                    </Form>
                  </Formik>

                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AllSectionsTable
        selectedSections={selectedSections}
        setSelectedSections={setSelectedSections}
        sections={allSections}
      />
    </div>
  );
};

export default CreateNewTest;
