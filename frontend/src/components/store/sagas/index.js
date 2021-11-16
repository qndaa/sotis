import { fork } from "redux-saga/effects";
import authSaga from "./auth";
import testSaga from "./tests";

export default function* rootSaga() {
  yield fork(authSaga);
  yield fork(testSaga);
}
