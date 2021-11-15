import { takeLatest, call, put } from "redux-saga/effects";
import ACTION_TYPES from "../actionTypes/tests";
import testService from "../../../services/tests/TestService";
import { addNewAnswer } from "../actions/tests";
import PAGE_ROUTES from "../../../pageRoutes";

export function* createNewAnswer({ type, text, identifier }) {
  console.log(text);
  try {
    const answer = yield call(testService.createNewAnswer, {
      text,
      identifier,
    });
    if (tokens.data) {
      yield put(addNewAnswer(answer.data));
      // TODO: treba omoguciti ovako, ali ne radi sa react router v6+
      // yield put(push(PAGE_ROUTES.HOME));
    } else {
      throw new Error("Login credentials are invalid!");
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* testSaga() {
  yield takeLatest(ACTION_TYPES.CREATE_NEW_ANSWER, createNewAnswer);
}
