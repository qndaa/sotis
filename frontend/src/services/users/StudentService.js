import { client } from "../HttpClient";

const ROUTES = {
  USERS: "/users/",
  GET_ALL_STUDENTS: "/users/students/",
};

class StudentService {
  constructor() {
    this.client = client;
    this.init();
  }

  init = () => {};

  getAllStudents = async () => {
    const allStudents = await this.client({
      method: "GET",
      url: ROUTES.GET_ALL_STUDENTS,
    });

    return allStudents;
  };
}

const studentService = new StudentService();

export default studentService;
