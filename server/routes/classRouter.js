import express from 'express';
import { createClass, getAllClasses, getClassByName, addSubjectToClass, getStudentSubjects, getTeacherSubjects, getUpcomingCourses } from '../controllers/classController.js';

const router = express.Router();


router.post('/', createClass);
router.get('/', getAllClasses);
router.get('/:name', getClassByName);
router.post('/add_subject', addSubjectToClass);
router.post('/student/courses', getStudentSubjects);
router.post('/teacher/courses', getTeacherSubjects);
router.post("/upcomingCourses", getUpcomingCourses);

export default router;