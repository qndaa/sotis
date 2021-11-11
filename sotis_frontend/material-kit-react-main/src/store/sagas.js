import { fork } from "redux-saga/effects";
import UserSaga from "src/pages/users/store/sagas";

import AuthSagas from "../components/authentication/store/sagas";

export default function* rootSaga() {
  yield fork(AuthSagas);
  yield fork(UserSaga);
}
