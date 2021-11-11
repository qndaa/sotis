import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./header/Header";
import Login from "./Login";
import "./App.css";
import Registration from "./Registration";
import Error from "./Error";
import Sidebar from "./sidebar/Sidebar";
import Home from "./home/Home";
import CreateTest from "./tests/CreateTest";

export default function App() {
    return (
        <div>
            <Router>
                <div id={`wrapper`}>
                    <Sidebar />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id={`content`}>
                            <Header/>
                            <Switch>
                                <Route path={`/`} exact={true} component={Home} />
                                <Route path={`/home`} exact={true} component={Home} />
                                <Route path={`/createTest`} exact={true} component={CreateTest} />
                                <Route path={`/login`} exact={true} component={Login}/>
                                <Route path={`/registration`} exact={true} component={Registration}/>
                                <Route path={`/forbidden`} exact>
                                    <Error code={403} title={`Forbidden Page`}/>
                                </Route>
                                <Route>
                                    <Error code={404} title={`Page Not Found`}/>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        </div>
    )
}