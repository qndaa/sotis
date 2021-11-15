import produce from "immer";
import ACTION_TYPES from "../actionTypes/tests";

export const initialState = {
  questions: null,
  answers: [],
};

const testsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ACTION_TYPES.ADD_NEW_ANSWER:
        draft.answers = draft.answers.push(action.answers);
        break;
      default:
        return initialState;
    }
  });

export default testsReducer;
