import ACTION_TYPES from "../actionTypes/courses";

export function select(courseId) {
  return {
    type: ACTION_TYPES.SELECT,
    courseId,
  };
}

export function clear() {
  return {
    type: ACTION_TYPES.CLEAR,
  };
}
