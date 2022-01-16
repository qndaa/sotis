import React from "react";
import { Formik, Form, Field } from "formik";
import testService from "../../services/tests/TestService";

const handleSubmit = (data) => {
  testService.saveDomain(data);
};

const CreateDomain = () => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9 mt-5">
          <div className=" o-hidden border-0 my-5">
            <div className="card-body p-0">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        Create a domain!
                      </h1>
                    </div>
                    <Formik
                      initialValues={{ name: "" }}
                      className="user "
                      onSubmit={(value, { resetForm }) => {
                        handleSubmit(value);
                        resetForm();
                      }}
                    >
                      <Form>
                        <div className="form-group">
                          <Field
                            type="text"
                            className={`form-control rounded form-control-user`}
                            id="name"
                            name="name"
                            placeholder="Enter domain name..."
                            autoComplete={`false`}
                            required
                          />
                        </div>
                        <div className="row justify-content-center mb-2">
                          <button className="btn btn-primary" type="submit">
                            Submit
                          </button>
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
      </div>
    </>
  );
};

export default CreateDomain;
