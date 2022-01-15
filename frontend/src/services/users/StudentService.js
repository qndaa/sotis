import authService from "../authentication/AuthenticationService";

const ROUTES = {
  USERS: "/users/",
  GET_ALL_STUDENTS: "/users/students/",
};

class StudentService {
  constructor() {
    this.client = authService.client;
  }

  getAllStudents = async () => {
    return await this.client({
      method: "GET",
      url: ROUTES.GET_ALL_STUDENTS,
    });
  };

  getStudentsForCourse = async (courseId) => {
    return await this.client({
      method: "GET",
      url: `${ROUTES.USERS}?course=${courseId}&student=true`,
    });
  };
}

const studentService = new StudentService();

export default studentService;
