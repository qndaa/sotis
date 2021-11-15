import { fork } from "redux-saga/effects";
import testSaga from "./tests";
import AuthSagas from "./auth";

export default function* rootSaga() {
  yield fork(AuthSagas);
  yield fork(testSaga);
}
