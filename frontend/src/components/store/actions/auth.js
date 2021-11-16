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

export function setToken(token) {
  return {
    type: ACTION_TYPES.SET_TOKEN,
    token,
  };
}

export function setRefreshToken(refreshToken) {
  return {
    type: ACTION_TYPES.SET_REFRESH,
    refreshToken,
  };
}
