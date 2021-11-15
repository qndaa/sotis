import ACTION_TYPES from "../actionTypes/auth";

export function login(email, password, setErrors) {
  return {
    type: ACTION_TYPES.LOGIN,
    email,
    password,
    meta: {
      setErrors,
    },
  };
}

export function logout() {
  return {
    type: ACTION_TYPES.LOGOUT,
  };
}
