import ACTION_TYPES from "./actionTypes";

export function fetchTestHistory() {
  return {
    type: ACTION_TYPES.FETCH_TEST_HISTORY,
  };
}

export function setTestHistory(testHistory) {
  return {
    type: ACTION_TYPES.SET_TEST_HISTORY,
    testHistory,
  };
}
