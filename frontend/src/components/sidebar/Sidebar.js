import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlus,
  faBong,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import PAGE_ROUTES from "../../pageRoutes";
import { useSelector } from "react-redux";

export default function () {
  const selectedCourse = useSelector((state) => state.courses.selectedCourse);

  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <Logo />
      <hr className="sidebar-divider my-0" />
      <li className="nav-item active">
        <Link className="nav-link" to={PAGE_ROUTES.CHOOSE_COURSE}>
          <FontAwesomeIcon icon={faBong} className={`mr-2`} />
          <span>Choose course</span>
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item active">
        <Link className="nav-link" to={`/home/${selectedCourse}`}>
          <FontAwesomeIcon icon={faHome} className={`mr-2`} />
          <span>Home</span>
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item active">
        <Link className="nav-link" to={PAGE_ROUTES.CREATE_TEST}>
          <FontAwesomeIcon icon={faPlus} className={`mr-2`} />
          <span>Create Test</span>
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item active">
        <Link className="nav-link" to={PAGE_ROUTES.CREATE_QUESTION}>
          <FontAwesomeIcon icon={faPlus} className={`mr-2`} />
          <span>Create Question</span>
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item active">
        <Link className="nav-link" to={PAGE_ROUTES.CREATE_DOMAIN}>
          <FontAwesomeIcon icon={faPlus} className={`mr-2`} />
          <span>Create Domain</span>
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item active">
        <Link className="nav-link" to={PAGE_ROUTES.CREATE_SECTION}>
          <FontAwesomeIcon icon={faPlus} className={`mr-2`} />
          <span>Create Section</span>
        </Link>
      </li>
      {selectedCourse && (
        <>
          <hr className="sidebar-divider my-0" />
          <li className="nav-item active">
            <Link
              className="nav-link"
              to={`${PAGE_ROUTES.EXPECTED_KS_NOPARAM}${selectedCourse}`}
            >
              <FontAwesomeIcon icon={faBrain} className={`mr-2`} />
              <span>Create a knowledge space</span>
            </Link>
          </li>
        </>
      )}

      <hr className="sidebar-divider my-0" />
    </ul>
  );
}
