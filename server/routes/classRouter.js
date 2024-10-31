import express from 'express';
import { createClass, getAllClasses, getClassByName, addSubjectToClass, getStudentSubjects, getTeacherSubjects, getUpcomingCourses } from '../controllers/classController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();


router.post('/', createClass);
router.get('/', getAllClasses);
router.get('/:name', getClassByName);
router.post('/add_subject', verifyToken, addSubjectToClass);
router.post('/student/courses', verifyToken, getStudentSubjects);
router.post('/teacher/courses', verifyToken, getTeacherSubjects);
router.post("/upcomingCourses", verifyToken, getUpcomingCourses);

export default router;