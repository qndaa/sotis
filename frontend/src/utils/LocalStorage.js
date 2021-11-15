const ACCESS_TOKEN_NAME = "token";
const REFRESH_TOKEN_NAME = "refresh_token";

export function getItem(itemName) {
  try {
    return JSON.parse(localStorage.getItem(itemName));
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function setItem(itemName, value) {
  localStorage.setItem(itemName, JSON.stringify(value));
}

export function removeItem(itemName) {
  localStorage.removeItem(itemName);
}

export function getAccessToken() {
  try {
    return localStorage.getItem(ACCESS_TOKEN_NAME);
  } catch {
    return null;
  }
}

export function getRefreshToken() {
  try {
    return localStorage.getItem(REFRESH_TOKEN_NAME);
  } catch {
    return null;
  }
}

export function getTokens() {
  return {
    access: getAccessToken(),
    refresh: getRefreshToken(),
  };
}

export function setAccessToken(token) {
  localStorage.setItem(ACCESS_TOKEN_NAME, token);
}

export function setRefreshToken(refreshToken) {
  localStorage.setItem(REFRESH_TOKEN_NAME, refreshToken);
}

export function removeAccessToken() {
  removeItem(ACCESS_TOKEN_NAME);
}

export function removeRefreshToken() {
  removeItem(REFRESH_TOKEN_NAME);
}

export function removeTokens() {
  removeAccessToken();
  removeRefreshToken();
}
