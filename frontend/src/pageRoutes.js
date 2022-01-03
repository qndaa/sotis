const PAGE_ROUTES = {
  HOME_EMPTY: "/",
  HOME: "/home",
  LOGIN: "/login",
  CREATE_TEST: "/create-test",
  TAKE_TEST: "/take-test/:id",
  CREATE_QUESTION: "/create-question",
  CREATE_SECTION: "/create-section",
  CANVAS: "/canvas",
  KNOWLEDGE_SPACES: "/knowledge-spaces/:testId",
  KNOWLEDGE_STATES:
    "/knowledge-state/student/:studentId/test/:testId/th/:testHistoryId",
  FORBIDDEN: "/forbidden",
  NOT_FOUND: "/not-found",
};

export default PAGE_ROUTES;
