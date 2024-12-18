import express from 'express';
import { createGrade, getAllGrades, getGradeByLevel, getGradeById } from '../controllers/gradeController.js';

const router = express.Router();

// Create a grade
router.post('/', createGrade);

// Get all grades
router.get('/', getAllGrades);

// Get a grade by level
router.get('/:level', getGradeByLevel);

router.get('/id/:id', getGradeById);

export default router;