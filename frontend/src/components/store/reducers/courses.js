import ACTION_TYPES from "../actionTypes/courses";
import produce from "immer";

export const initialState = {
  selectedCourse: localStorage.getItem("selectedCourse") || null,
};

const courseReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ACTION_TYPES.SELECT:
        draft.selectedCourse = action.courseId;
        break;

      case ACTION_TYPES.CLEAR:
        return initialState;
    }
  });

export default courseReducer;
