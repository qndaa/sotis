import { takeLatest, call, put } from "redux-saga/effects";
import ACTION_TYPES from "./actionTypes";
import { push } from "connected-react-router";
import testHistoryService from "src/services/testHistory/TestHistoryService";
import { setTestHistory } from "./actions";

export function* fetchTestHistory({ type }) {
  try {
    const testHistory = yield call(testHistoryService.fetchTestHistory);
    if (testHistory) {
      console.log(testHistory.results);
      yield put(setTestHistory(testHistory.results));
      yield put(push("/"));
    } else {
      throw new Error("Could not fetch test history data!");
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* UserSaga() {
  yield takeLatest(ACTION_TYPES.FETCH_TEST_HISTORY, fetchTestHistory);
}
