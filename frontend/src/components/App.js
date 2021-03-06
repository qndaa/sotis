import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./header/Header";
import Login from "./Login";
import "./App.css";
import Registration from "./Registration";
import Error from "./Error";
import Sidebar from "./sidebar/Sidebar";
import Home from "./home/Home";
import CreateTest from "./tests/CreateTest";
import PAGE_ROUTES from "../pageRoutes";
import { useDispatch } from "react-redux";
import { logout } from "./store/actions/auth";
import CreateQuestion from "./tests/CreateQuestion";
import CreateSections from "./tests/CreateSections";
import CreateNewTest from "./tests/CreateNewTest";
import TakeTest from "./tests/TakeTest";
import Canvas from "./canvas";
import KnowledgeSpacePage from "../containers/KnowledgeSpacesPage";
import KnowledgeStatePage from "../containers/KnowledgeStatePage";
import Courses from "../containers/CoursesPage";
import CreateDomain from "./tests/CreateDomain";
import ExpectedKnowledgeSpacePage from "../containers/ExpectedKSPage";
// import CreateQuestion from "./tests/CreateQuestion";

export default function App(props) {
  const dispatch = useDispatch();

  return (
    <div>
      <Router>
        <div id={`wrapper`}>
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id={`content`}>
              <Header
                logout={() => {
                  dispatch(logout());
                }}
              />
              <Routes>
                <Route exact path={PAGE_ROUTES.HOME} element={<Home />} />
                <Route exact path={PAGE_ROUTES.HOME_EMPTY} element={<Home />} />
                <Route exact path={PAGE_ROUTES.LOGIN} element={<Login />} />
                <Route
                  path={PAGE_ROUTES.CREATE_TEST}
                  exact={true}
                  element={<CreateNewTest />}
                />
                <Route
                  path={PAGE_ROUTES.CREATE_QUESTION}
                  exact={true}
                  element={<CreateQuestion />}
                />
                <Route
                  path={PAGE_ROUTES.CREATE_SECTION}
                  exact={true}
                  element={<CreateSections />}
                />
                <Route
                  path={PAGE_ROUTES.TAKE_TEST}
                  exact
                  element={<TakeTest />}
                />
                <Route
                  path={PAGE_ROUTES.KNOWLEDGE_SPACES}
                  exact
                  element={<KnowledgeSpacePage />}
                ></Route>
                <Route
                  path={PAGE_ROUTES.KNOWLEDGE_STATES}
                  exact
                  element={<KnowledgeStatePage />}
                ></Route>
                <Route path={PAGE_ROUTES.CANVAS} exact element={<Canvas />} />
                <Route
                  path={PAGE_ROUTES.FORBIDDEN}
                  exact
                  element={<Error code={403} title={`Forbidden Page`} />}
                />
                <Route
                  exact
                  path={PAGE_ROUTES.CHOOSE_COURSE}
                  element={<Courses />}
                />
                <Route
                  exact
                  path={PAGE_ROUTES.CREATE_DOMAIN}
                  element={<CreateDomain />}
                />
                <Route
                  exact
                  path={PAGE_ROUTES.EXPECTED_KS}
                  element={<ExpectedKnowledgeSpacePage />}
                />
                {/* <Route exact path={PAGE_ROUTES.NOT_FOUND}>
                  <Error code={404} title={`Page Not Found`} />
                </Route> */}
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}
