import authService from "../authentication/AuthenticationService";

const ROUTES = {
  COURSES: "/courses/",
};

class CourseService {
  constructor() {
    this.client = authService.client;
  }

  getAllCourses = async () => {
    return await this.client({
      method: "GET",
      url: ROUTES.COURSES,
    });
  };
}

const courseService = new CourseService();

export default courseService;
