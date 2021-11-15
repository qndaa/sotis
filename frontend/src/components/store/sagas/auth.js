import { takeLatest, call, put } from "redux-saga/effects";
import ACTION_TYPES from "../actionTypes/auth";
import authService from "../../../services/authentication/AuthenticationService";
import { setToken, setRefreshToken } from "../actions/auth";
import PAGE_ROUTES from "../../../pageRoutes";

export function* login({ type, email, password }) {
  try {
    const tokens = yield call(authService.login, { email, password });
    if (tokens.data) {
      yield put(setToken(tokens.data.access));
      yield put(setRefreshToken(tokens.data.refresh));
      // TODO: treba omoguciti ovako, ali ne radi sa react router v6+
      // yield put(push(PAGE_ROUTES.HOME));
      window.location.replace(window.location + PAGE_ROUTES.HOME);
    } else {
      throw new Error("Login credentials are invalid!");
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* authSaga() {
  yield takeLatest(ACTION_TYPES.LOGIN, login);
}
