import express from 'express';
import { getStudentByEmail, getAllStudents, createStudent } from '../controllers/studentController.js';

const router = express.Router();

// Get student by email (pk)
router.get('/:email', getStudentByEmail);

// Get all students
router.get('/', getAllStudents);

// Create student
router.post('/', createStudent);

export default router;