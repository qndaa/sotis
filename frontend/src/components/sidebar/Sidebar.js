import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import PAGE_ROUTES from "../../pageRoutes";

export default function () {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <Logo />
      <hr className="sidebar-divider my-0" />
      <li className="nav-item active">
        <Link className="nav-link" to={`/home`}>
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
        <Link className="nav-link" to={PAGE_ROUTES.CREATE_SECTION}>
          <FontAwesomeIcon icon={faPlus} className={`mr-2`} />
          <span>Create Section</span>
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to={PAGE_ROUTES.CANVAS}>
          <FontAwesomeIcon icon={faPlus} className={`mr-2`} />
          <span>Canvas</span>
        </Link>
      </li>
      <hr className="sidebar-divider my-0" />
    </ul>
  );
}
