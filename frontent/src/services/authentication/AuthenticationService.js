import {
  setRefreshToken,
  setAccessToken,
  removeTokens,
  getAccessToken,
  getRefreshToken,
} from "../utils/localStorage";
import jwtDecode from "jwt-decode";
import { client } from "./AlternativeHttpClient";

const ROUTES = {
  LOGIN: "/login/",
  TOKEN_REFRESH: "/token/refresh/",
  REGISTER: "/users/",
};

class AuthService {
  constructor() {
    this.client = client;
    this.init();
  }

  init = () => {
    this.client.interceptors.request.use(this.addAuthorization);
    this.client.interceptors.response.use(
      this.handleSuccessResponse,
      this.handleErrorResponse
    );
  };

  addAuthorization = (request) => {
    const accessToken = getAccessToken();
    if (accessToken)
      request.headers.Authorization = accessToken && `Bearer ${accessToken}`;
    return this.checkTokenExpiration(request);
  };

  setTokens = (tokens) => {
    if (tokens) {
      setAccessToken(tokens.access);
      setRefreshToken(tokens.refresh);

      this.attachHeaders({
        Authorization: `Bearer ${tokens.access}`,
      });
    }
  };

  attachHeaders = (headers) => {
    Object.assign(this.client.defaults.headers, headers);
  };

  refreshToken = async (previousToken) => {
    const tokens = await this.client({
      url: ROUTES.TOKEN_REFRESH,
      method: "POST",
      data: {
        refresh: previousToken,
      },
      headers: {
        Authorization: `Bearer ${previousToken}`,
      },
    });

    this.setTokens(tokens);

    return tokens.access;
  };

  login = async (data) => {
    const tokens = await this.client({
      method: "POST",
      url: ROUTES.LOGIN,
      data,
    });
    this.setTokens(tokens.data);
    console.log(tokens.data);

    return tokens;
  };

  logout = () => {
    this.destroySession();
  };

  register = async (data) => {
    const tokens = await this.client({
      url: ROUTES.REGISTER,
      method: "POST",
      data,
    });

    this.setTokens(tokens.data);

    return tokens;
  };

  destroySession = () => {
    removeTokens();
    this.removeHeaders(["Authorization"]);
  };

  removeHeaders = (headerKey) => {
    headerKey.forEach((key) => delete this.client.defaults.headers[key]);
  };

  checkTokenExpiration = async (request) => {
    if (request.url === ROUTES.TOKEN_REFRESH) {
      return request;
    }

    const token = getAccessToken();

    if (token && Date.now() / 1000 >= jwtDecode(token).exp) {
      const newToken = await this.refreshToken(getRefreshToken());
      request.headers.Authorization = `Bearer ${newToken}`;

      return request;
    }

    return request;
  };

  handleSuccessResponse = (response) => {
    return response;
  };

  handleErrorResponse = (error) => {
    try {
      const { status } = error.response;

      /* eslint-disable default-case */
      switch (status) {
        case 401:
          this.destroySession();
          break;
      }

      return Promise.reject(error);
    } catch (e) {
      return Promise.reject(error);
    }
  };
}

const authService = new AuthService();

export default authService;
