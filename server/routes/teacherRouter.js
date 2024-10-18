import express from 'express';
import { getTeacherByEmail, getAllTeachers, createTeacher } from '../controllers/teacherController.js';

const router = express.Router();

// Get teacher by email (indexed)
router.get('/:email', getTeacherByEmail);

// Get all teachers
router.get('/', getAllTeachers);

// Create teacher
router.post('/', createTeacher);

export default router;
