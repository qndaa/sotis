import { client } from "../HttpClient";

const ROUTES = {
  TEST_HISTORIES: "/test-history/",
};

class TestHistoryService {
  constructor() {
    this.client = client;
  }

  fetchTestHistory = async () => {
    const testHistory = await this.client({
      method: "GET",
      url: ROUTES.TEST_HISTORIES,
    });

    return testHistory.data;
  };
}

const testHistoryService = new TestHistoryService();

export default testHistoryService;
