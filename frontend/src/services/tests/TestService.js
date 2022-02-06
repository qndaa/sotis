import authService from "../authentication/AuthenticationService";

const ROUTES = {
  CREATE_NEW_ANSWER: "/answers/",
  CREATE_NEW_QUESTION: "/questions/",
  SAVE_SECTION: "/sections/",
  SAVE_TEST: "/tests/",
  SAVE_CONNECTION: "/connections/",
  KNOWLEDGE_SPACES: "/knowledge-spaces/",
  TEST_HISTORIES: "/test-history/",
  DOMAINS: "/domains/",
  DOMAIN_CONNECTIONS: "/domain-connections/",
  QUESTIONS: "/questions/",
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

  assignProblemToTest = async (testId, problemId) => {
    if (testId && problemId) {
      const updatedTest = await this.client({
        method: "PATCH",
        url: `${ROUTES.SAVE_TEST}${testId}/assign-problem/`,
        data: { problem: problemId },
      });

      return updatedTest;
    }
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

  getDomains = async (data) => {
    const allDomains = await this.client({
      method: "GET",
      url: ROUTES.DOMAINS,
      data,
    });

    return allDomains;
  };

  saveDomain = async (data) => {
    const newDomain = await this.client({
      method: "POST",
      url: ROUTES.DOMAINS,
      data,
    });

    return newDomain;
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

  getAllKnowledgeSpaces = async () => {
    return await this.client({
      method: "GET",
      url: `${ROUTES.KNOWLEDGE_SPACES}?computed=false`,
    });
  };

  getTemplate = async (filename) => {
    return await this.client({
      method: "GET",
      url: `static/${filename}/`,
    });
  };

  createDomainConnection = async (data) => {
    return await this.client({
      method: "POST",
      url: `${ROUTES.DOMAIN_CONNECTIONS}`,
      data,
    });
  };

  createDomainConnections = async (data) => {
    return await this.client({
      method: "POST",
      url: `${ROUTES.DOMAIN_CONNECTIONS}mass-save/`,
      data,
    });
  };

  getTestHistoriesForStudent = async (studentId, courseId) => {
    return await this.client({
      method: "GET",
      url: `${ROUTES.TEST_HISTORIES}for-student/${studentId}/?course=${courseId}`,
    });
  };

  sortByCKS = async (testId, sortByComputedKs) => {
    return await this.client({
      method: "PATCH",
      url: `${ROUTES.SAVE_TEST}${testId}/`,
      data: { sort_by_computed_ks: sortByComputedKs },
    });
  };

  getTestHistoriesById = async (courseId) => {
    return await this.client({
      method: "GET",
      url: `${ROUTES.TEST_HISTORIES}auto/?course_id=${courseId}`,
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

  createKnowledgeSpace = async (data) => {
    return await this.client({
      method: "POST",
      url: `${ROUTES.KNOWLEDGE_SPACES}`,
      data,
    });
  };

  mapDomainToQuestion = async (questionId, domainId) => {
    return await this.client({
      method: "PATCH",
      url: `${ROUTES.QUESTIONS}${questionId}/`,
      data: { domain: domainId },
    });
  };
}

const testService = new TestService();

export default testService;
