export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTE = "api/author";
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const GET_USER_INFO = `${AUTH_ROUTE}/user-info`;
export const UPDATE_USER_INFO = `${AUTH_ROUTE}/update-user-info`;
export const ADD_PROFILE_IMG = `${AUTH_ROUTE}/add-profile-image`;
export const DELETE_PROFILE_IMG = `${AUTH_ROUTE}/delete-profile-image`;
export const LOGOUT_ROUTE = `${AUTH_ROUTE}/logout`;


export const CLASS_ROUTE = "api/class";
export const COURSES_STUDENT_ROUTE = `${CLASS_ROUTE}/student/courses`;
export const CLASS_UPCOMING_COURSES = `${CLASS_ROUTE}/upcomingCourses`;

export const EXAM_ROUTE = "api/exam";
export const EXAM_UPLOAD_ROUTE = `${EXAM_ROUTE}/upload`;
export const EXAM_DELETE_ROUTE = `${EXAM_ROUTE}/delete`;
export const EXAM_UPDATE_ROUTE = `${EXAM_ROUTE}/update`;
export const EXAM_GET_ROUTE = `${EXAM_ROUTE}/get`;
export const EXAM_GET_ALL_ROUTE = `${EXAM_ROUTE}/get-all`;
export const EXAM_TEACHER = `${EXAM_ROUTE}/teacher`;
export const EXAM_STUDENT = `${EXAM_ROUTE}/student`;
export const UPCOMING_EXAMS = `${EXAM_ROUTE}/upcomingExams`;
export const LAST_EXAMS = `${EXAM_ROUTE}/lastExams`;
export const EXAM_CREATE = `${EXAM_ROUTE}/create`;


export const RESULTS_ROUTE = "api/results";
export const RESULTS_STUDENT = `${RESULTS_ROUTE}/student`;
export const RESULTS_TEACHER = `${RESULTS_ROUTE}/teacher`;
export const RESULTS_STUDENT_AVERAGE = `${RESULTS_ROUTE}/student/average`;
export const RESULTS_STUDENT_RANK = `${RESULTS_ROUTE}/student/rank`;
export const RESULTS_TEACHER_AVERAGE = `${RESULTS_ROUTE}/teacher/average`;