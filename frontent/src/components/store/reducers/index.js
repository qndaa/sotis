import { combineReducers } from "redux";
import auth from "./auth";
import testsReducer from "./tests";

export default combineReducers({
  auth: auth,
  tests: testsReducer,
});
