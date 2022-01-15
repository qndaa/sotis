import { combineReducers } from "redux";
import auth from "./auth";
import testsReducer from "./tests";
import courseReducer from "./courses";

export default combineReducers({
  auth: auth,
  tests: testsReducer,
  courses: courseReducer,
});
