import authService from "../authentication/AuthenticationService";

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
    this.client = authService.client;
    console.log(this.client);
  }

  getTestsForCourse = async (courseId) => {
    const allTests = await this.client({
      method: "GET",
      url: `${ROUTES.SAVE_TEST}?course=${courseId}`,
    });

    return allTests;
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

  getQti = async (testId) => {
    return await this.client({
      method: "GET",
      url: `${ROUTES.SAVE_TEST}${testId}/get-ims/`,
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
}

const testService = new TestService();

export default testService;
