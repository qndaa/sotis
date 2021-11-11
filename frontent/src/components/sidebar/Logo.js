import React from "react";
import {faFile} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function () {
    return (
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href={`/`}>
            <div className="sidebar-brand-icon">
                <FontAwesomeIcon icon={faFile}/>
            </div>
            <div className="sidebar-brand-text mx-3">Tests</div>
        </a>

    );
}