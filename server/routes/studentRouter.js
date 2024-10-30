import express from 'express';
import {
	getStudentByEmail,
	getAllStudents,
	createStudent,
	getStudentResults,
} from '../controllers/studentController.js';

const router = express.Router();

router.get('/:email', getStudentByEmail);
router.get('/', getAllStudents);
router.post('/', createStudent);
router.get('/results/:id', getStudentResults);


export default router;