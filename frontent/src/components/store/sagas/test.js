import { takeLatest, call, put } from "redux-saga/effects";
import ACTION_TYPES from "../actionTypes/tests";
import testService from "../../../services/authentication/TestService";
import PAGE_ROUTES from "../../../pageRoutes";
import { addNewAnswer } from "../actions/tests";

export function* createNewAnswer({ type, text, identifier }) {
  console.log("in saga");
  try {
    const answer = yield call(testService.createNewAnswer, {
      text,
      identifier,
    });
    if (answer.data) {
      yield put(addNewAnswer(answer.data));

      // TODO: treba omoguciti ovako, ali ne radi sa react router v6+
      // yield put(push(PAGE_ROUTES.HOME));
      //   window.location.replace(window.location + PAGE_ROUTES.HOME);
    } else {
      throw new Error("Could not create answer!");
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* testSaga() {
  yield takeLatest(ACTION_TYPES.CREATE_NEW_ANSWER, createNewAnswer);
}
