import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./components/store/reducers";
import createSagaMiddleware from "redux-saga";

//const initialState = {};
let reduxSagaMonitorOptions = {};

const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

const middleware = [sagaMiddleware, thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
