import authService from "../authentication/AuthenticationService";

const ROUTES = {
  ROOT: "/problems/",
};

class ProblemService {
  constructor() {
    this.client = authService.client;
  }

  createProblem = async (data) => {
    const createdProblem = await this.client({
      method: "POST",
      url: `${ROUTES.ROOT}`,
      data,
    });

    return createdProblem;
  };

  getAllProblems = async () => {
    const allProblems = await this.client({
      method: "GET",
      url: `${ROUTES.ROOT}`,
    });

    return allProblems;
  };
}

const problemService = new ProblemService();

export default problemService;
