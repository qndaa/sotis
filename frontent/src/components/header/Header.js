import React from "react";
import {Link} from "react-router-dom";

export default function () {
    return (
        <nav
            className={`navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow d-flex justify-content-end`}>
            <Link className={`btn btn-primary mr-3`} to={`/registration`}>Registration</Link>
            <Link className={`btn btn-primary mr-3`} to={`/login`}>Login</Link>
        </nav>

    )
}