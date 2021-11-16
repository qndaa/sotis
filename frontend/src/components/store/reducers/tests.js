import produce from "immer";
import ACTION_TYPES from "../actionTypes/tests";

export const initialState = {
  questions: null,
  answers: [],
  showSuccessToast: false,
  allQuestions: [],
  allSections: [],
  selectedTest: null,
};

const testsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ACTION_TYPES.ADD_NEW_ANSWER:
        console.log(action.answer);
        draft.answers.push(action.answer);
        break;
      case ACTION_TYPES.CREATE_NEW_ANSWER:
        break;
      case ACTION_TYPES.CREATE_NEW_QUESTION:
        break;
      case ACTION_TYPES.SHOW_SUCCESS_TOAST:
        draft.showSuccessToast = true;
        break;
      case ACTION_TYPES.CLOSE_SUCCESS_TOAST:
        draft.showSuccessToast = false;
        break;
      case ACTION_TYPES.FETCH_ALL_QUESTIONS:
        break;
      case ACTION_TYPES.FETCH_ALL_SECTIONS:
        break;
      case ACTION_TYPES.SAVE_SECTION:
        break;
      case ACTION_TYPES.SAVE_TEST:
        break;
      case ACTION_TYPES.FETCH_TEST:
        break;
      case ACTION_TYPES.SET_TEST:
        draft.selectedTest = action.test;
        break;
      case ACTION_TYPES.SET_ALL_QUESTIONS:
        draft.allQuestions = action.allQuestions;
        break;
      case ACTION_TYPES.SET_ALL_SECTIONS:
        draft.allSections = action.allSections;
        break;

      default:
        return initialState;
    }
  });

export default testsReducer;
