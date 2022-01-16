import React, { useState, useEffect } from "react";
import PAGE_ROUTES from "../../pageRoutes";
import courseService from "../../services/courses/courseService";
import { useDispatch } from "react-redux";
import { select } from "../../components/store/actions/courses";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    courseService.getAllCourses().then((res) => {
      setCourses(res.data);
    });
  }, []);

  const renderCourses = () => {
    const sorted = courses.sort((a, b) => {
      let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    return sorted.map((course) => {
      return (
        <div className="card" style={{ width: "18rem" }}>
          <div
            style={{
              backgroundColor: course.color,
              height: "5vh",
              width: "100%",
            }}
          ></div>
          <div className="card-body">
            <p
              className="card-text"
              style={{ textAlign: "center", textDecoration: "none" }}
            >
              {course.name}
            </p>

            <div className="d-flex justify-content-center mt-2">
              <button
                className="btn btn-primary"
                onClick={() => {
                  dispatch(select(course.id));
                  navigate(`/home/${course.id}`);
                }}
              >
                View
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "18rem 18rem",
            gap: "2vh",
          }}
        >
          {renderCourses()}
        </div>
      </div>
    </>
  );
};

export default Courses;
