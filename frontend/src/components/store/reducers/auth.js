// const INITIAL_STATE = {
//   loggedIn: false,
//   access: "",
//   refresh: "",
// };

// export default (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };

import ACTION_TYPES from "../actionTypes/auth";
import { getTokens } from "../../../utils/LocalStorage";
import produce from "immer";

export const initialState = {
  tokens: getTokens() || null,
  loggedIn: false,
};

const authenticationReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ACTION_TYPES.SET_TOKEN:
        draft.tokens = action.tokens;
        console.log(action.tokens);
        draft.loggedIn = true;
        break;

      case ACTION_TYPES.LOGOUT:
        draft.tokens = null;
        draft.loggedOut = false;
        break;

      case ACTION_TYPES.LOGIN:
        break;

      default:
        return initialState;
    }
  });

export default authenticationReducer;
