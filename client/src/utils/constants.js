export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTE = "api/auth";
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const GET_USER_INFO = `${AUTH_ROUTE}/user-info`;
export const UPDATE_USER_INFO = `${AUTH_ROUTE}/update-user-info`;
export const ADD_PROFILE_IMG = `${AUTH_ROUTE}/add-profile-image`;
export const DELETE_PROFILE_IMG = `${AUTH_ROUTE}/delete-profile-image`;
export const LOGOUT_ROUTE = `${AUTH_ROUTE}/logout`;


export const CLASS_ROUTE = "api/class";
export const COURSES_STUDENT_ROUTE = `${CLASS_ROUTE}/student/courses`;
export const COURSES_TEACHER_ROUTE = `${CLASS_ROUTE}/teacher/courses`;
export const CLASS_UPCOMING_COURSES = `${CLASS_ROUTE}/upcomingCourses`;
export const CLASS_INFO = `${CLASS_ROUTE}/student`;
export const STUDENTS_IN_CLASS = `${CLASS_ROUTE}/students`;
export const TEACHER_CLASSES = `${CLASS_ROUTE}/teacher/classes`;

export const EXAM_ROUTE = "api/exam";
export const EXAM_CREATE = `${EXAM_ROUTE}/create`;
export const EXAM_UPLOAD_ROUTE = `${EXAM_ROUTE}/upload`; // to do in the future
export const EXAM_DELETE_ROUTE = `${EXAM_ROUTE}/delete`;
export const EXAM_UPDATE_ROUTE = `${EXAM_ROUTE}/update`;
export const EXAM_GET_ALL_ROUTE = `${EXAM_ROUTE}/get-all`;
export const EXAM_TEACHER = `${EXAM_ROUTE}/teacher`;
export const EXAM_STUDENT = `${EXAM_ROUTE}/student`;
export const EXAM_RESULTS_STUDENT = `${EXAM_ROUTE}/student/result`;
export const UPCOMING_EXAMS = `${EXAM_ROUTE}/upcoming`;
export const LAST_EXAMS = `${EXAM_ROUTE}/last`;

export const ASSIGNMENT_ROUTE = "api/assignment";
export const ASSIGNMENT_CREATE = `${ASSIGNMENT_ROUTE}/create`;
export const ASSIGNMENT_UPLOAD_ROUTE = `${ASSIGNMENT_ROUTE}/upload`; // to do in the future
export const ASSIGNMENT_DELETE_ROUTE = `${ASSIGNMENT_ROUTE}/delete`;
export const ASSIGNMENT_UPDATE_ROUTE = `${ASSIGNMENT_ROUTE}/update`;
export const ASSIGNMENT_GET_ALL_ROUTE = `${ASSIGNMENT_ROUTE}/get-all`;
export const ASSIGNMENT_TEACHER = `${ASSIGNMENT_ROUTE}/teacher`;
export const ASSIGNMENT_STUDENT = `${ASSIGNMENT_ROUTE}/student`;
export const ASSIGNMENT_RESULTS_STUDENT = `${ASSIGNMENT_ROUTE}/student/result`;
export const CURRENT_ASSIGNMENTS = `${ASSIGNMENT_ROUTE}/current`;
export const UPCOMING_ASSIGNMENTS = `${ASSIGNMENT_ROUTE}/upcoming`;
export const LAST_ASSIGNMENTS = `${ASSIGNMENT_ROUTE}/last`;


export const RESULTS_ROUTE = "api/results";
export const RESULTS_STUDENT = `${RESULTS_ROUTE}/student`;
export const RESULTS_TEACHER = `${RESULTS_ROUTE}/teacher`;
export const RESULTS_STUDENT_AVERAGE = `${RESULTS_ROUTE}/student/average`;
export const RESULTS_STUDENT_RANK = `${RESULTS_ROUTE}/student/rank`;
export const RESULTS_TEACHER_AVERAGE = `${RESULTS_ROUTE}/teacher/average`;

export const GRADE_ROUTE = "api/grade/id";