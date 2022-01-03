import {
  setRefreshToken,
  setAccessToken,
  removeTokens,
  getAccessToken,
  getRefreshToken,
} from "../../utils/LocalStorage";
import jwtDecode from "jwt-decode";
import { client } from "../HttpClient";

const ROUTES = {
  CREATE_NEW_ANSWER: "/answers/",
  CREATE_NEW_QUESTION: "/questions/",
  SAVE_SECTION: "/sections/",
  SAVE_TEST: "/tests/",
  SAVE_CONNECTION: "/connections/",
  KNOWLEDGE_SPACES: "/knowledge-spaces/",
  TEST_HISTORIES: "/test-history/",
};

class TestService {
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

  createNewAnswer = async (data) => {
    const newAnswer = await this.client({
      method: "POST",
      url: ROUTES.CREATE_NEW_ANSWER,
      data,
    });

    return newAnswer;
  };

  createNewQuestion = async (data) => {
    const newQuestion = await this.client({
      method: "POST",
      url: ROUTES.CREATE_NEW_QUESTION,
      data,
    });

    return newQuestion;
  };

  saveSection = async (data) => {
    const newSection = await this.client({
      method: "POST",
      url: ROUTES.SAVE_SECTION,
      data,
    });

    return newSection;
  };

  saveTest = async (data) => {
    const newTest = await this.client({
      method: "POST",
      url: ROUTES.SAVE_TEST,
      data,
    });

    return newTest;
  };

  getAllQuestions = async () => {
    const allQuestions = await this.client({
      method: "GET",
      url: ROUTES.CREATE_NEW_QUESTION,
    });

    return allQuestions;
  };
  getAllAnswers = async () => {
    const allAnswers = await this.client({
      method: "GET",
      url: ROUTES.CREATE_NEW_ANSWER,
    });

    return allAnswers;
  };

  getAllSections = async () => {
    const allSections = await this.client({
      method: "GET",
      url: ROUTES.SAVE_SECTION,
    });

    return allSections;
  };

  fetchTest = async ({ id }) => {
    console.log(`${ROUTES.SAVE_TEST}${id}`);
    const test = await this.client({
      method: "GET",
      url: `${ROUTES.SAVE_TEST}${id}/`,
    });

    return test;
  };

  saveConnection = async (data) => {
    console.log(data);
    const connection = await this.client({
      method: "POST",
      url: ROUTES.SAVE_CONNECTION,
      data,
    });

    return connection;
  };

  nextQuestion = async (test_id, question_id, reverse) => {
    return await this.client({
      method: "GET",
      url: `${ROUTES.SAVE_TEST}${test_id}/next/${
        question_id ? `${question_id}/` : ""
      }${reverse ? "true/" : ""}`,
    });
  };

  getKnowledgeSpacesForTest = async (testId) => {
    return await this.client({
      method: "GET",
      url: `${ROUTES.KNOWLEDGE_SPACES}for-test/${testId}/`,
    });
  };

  getTestHistoriesForStudent = async (studentId) => {
    return await this.client({
      method: "GET",
      url: `${ROUTES.TEST_HISTORIES}for-student/${studentId}/`,
    });
  };

  getCorrectAnswersForStudent = async (studentId, testId) => {
    return await this.client({
      method: "GET",
      url: `${ROUTES.TEST_HISTORIES}${testId}/correct-answers-for-student/${studentId}/`,
    });
  };

  createTestHistory = async (data) => {
    return await this.client({
      method: "POST",
      url: `${ROUTES.TEST_HISTORIES}`,
      data,
    });
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

const testService = new TestService();

export default testService;
