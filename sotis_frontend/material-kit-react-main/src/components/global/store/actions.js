import ACTION_TYPES from './actionTypes';

export function setToken(token) {
  return {
    type: ACTION_TYPES.SET_TOKEN,
    token
  };
}

export function setRefreshToken(refreshToken) {
  return {
    type: ACTION_TYPES.SET_REFRESH,
    refreshToken
  };
}
