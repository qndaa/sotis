import ACTION_TYPES from "./actionTypes";
import produce from "immer";

export const initialState = {
  testHistory: [],
};

const userReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ACTION_TYPES.SET_TEST_HISTORY:
        draft.testHistory = action.testHistory;
        break;

      default:
        return initialState;
    }
  });

export default userReducer;
