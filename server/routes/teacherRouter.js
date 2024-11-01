import express from 'express';
import {
	getTeacherByEmail,
	getAllTeachers,
	createTeacher,
	getTeacherInfo,
	getTeacherAveragePerformance,
	getTeacherUpcomingClasses,
	getAverageScoresForClasses,
} from '../controllers/teacherController.js';

const router = express.Router();

// Get teacher by email (indexed)
router.get('/:email', getTeacherByEmail);

// Get all teachers
router.get('/', getAllTeachers);

// Create teacher
router.post('/', createTeacher);

// Get teacher info
router.get('/:id/info', getTeacherInfo);

// Get teacher average performance
router.post('/average-performance', getTeacherAveragePerformance);

// Get teacher upcoming classes
router.post('/upcoming-classes', getTeacherUpcomingClasses);

// Get average scores for each class
router.post('/average-scores', getAverageScoresForClasses);

export default router;