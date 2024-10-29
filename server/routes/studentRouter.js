import express from 'express';
import { getStudentByEmail, getAllStudents, createStudent } from '../controllers/studentController.js';

const router = express.Router();

router.get('/:email', getStudentByEmail);
router.get('/', getAllStudents);
router.post('/', createStudent);



export default router;