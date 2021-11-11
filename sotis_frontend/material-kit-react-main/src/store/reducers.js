import { combineReducers } from "redux";
import tokenReducer from "../components/global/store/reducer";
import { connectRouter } from "connected-react-router";
import userReducer from "src/pages/users/store/reducer";

export default function createReducer(history, injectedReducers = {}) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    tokens: tokenReducer,
    user: userReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
