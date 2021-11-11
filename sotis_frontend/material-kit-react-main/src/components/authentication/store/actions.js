import ACTION_TYPES from "./actionTypes";

export function login(email, password) {
  return {
    type: ACTION_TYPES.LOGIN_REQUEST,
    email,
    password,
  };
}
