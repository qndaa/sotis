import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./components/store/reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./components/store/sagas";
import { composeWithDevTools } from "redux-devtools-extension";

//const initialState = {};
// let reduxSagaMonitorOptions = {};

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, thunk];

const store = createStore(
  rootReducer,
  // applyMiddleware(...middleware)
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);
// store.runSaga = sagaMiddleware.run;
store.injectedReducers = {};
store.injectedSagas = {};

export default store;
