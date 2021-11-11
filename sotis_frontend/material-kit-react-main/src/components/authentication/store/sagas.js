import { takeLatest, call, put } from "redux-saga/effects";
import ACTION_TYPES from "./actionTypes";
import authService from "../../../services/auth/AuthService";
import { setToken, setRefreshToken } from "../../global/store/actions";
import { push } from "connected-react-router";

export function* login({ type, email, password }) {
  try {
    const tokens = yield call(authService.login, { email, password });
    if (tokens.data) {
      yield put(setToken(tokens.data.access));
      yield put(setRefreshToken(tokens.data.refresh));
      yield put(push("/"));
    } else {
      throw new Error("Login credentials are invalid!");
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* authSaga() {
  yield takeLatest(ACTION_TYPES.LOGIN_REQUEST, login);
}
