import React, { useState, useEffect } from "react";
import PAGE_ROUTES from "../../pageRoutes";
import courseService from "../../services/courses/courseService";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    courseService.getAllCourses().then((res) => {
      setCourses(res.data);
    });
  }, []);

  const renderCourses = () => {
    return courses.map((course) => {
      return (
        <a href={`/home/${course.id}`} class="card-link">
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
            </div>
          </div>
        </a>
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
