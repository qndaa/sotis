import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ({ logout }) {
  const isLoggedIn = !!useSelector((state) => state.auth.tokens);
  return (
    <nav
      className={`navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow d-flex justify-content-end`}
    >
      {isLoggedIn ? (
        <a className={`btn btn-primary mr-3`} onClick={logout}>
          Log out
        </a>
      ) : (
        <>
          <Link className={`btn btn-primary mr-3`} to={`/registration`}>
            Registration
          </Link>
          <Link className={`btn btn-primary mr-3`} to={`/login`}>
            Login
          </Link>
        </>
      )}
    </nav>
  );
}
