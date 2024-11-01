import express from 'express';
import {
	createClass,
	getAllClasses,
	getClassByName,
	addSubjectToClass,
	getStudentSubjects,
	getTeacherSubjects,
	getUpcomingCourses,
	getStudentClass,
	getStudentsInClass,
	getClassesByTeacher
} from '../controllers/classController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();


router.post('/', createClass);
router.get('/', getAllClasses);
router.get('/:name', getClassByName);
router.post('/student', verifyToken, getStudentClass);
router.post('/add_subject', verifyToken, addSubjectToClass);
router.post('/student/courses', verifyToken, getStudentSubjects);
router.post('/teacher/courses', verifyToken, getTeacherSubjects);
router.post("/upcomingCourses", verifyToken, getUpcomingCourses);
router.post('/students', getStudentsInClass);
router.post("/teacher/classes", verifyToken, getClassesByTeacher); // Add this line


export default router;