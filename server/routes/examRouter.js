// server/routes/examRouter.js
import express from 'express';
import { createExam, getAllExams, getExamById, updateExam, deleteExam, getExamsByTeacher, upload } from '../controllers/examController.js';

const router = express.Router();

router.post('/', upload.single('file'), createExam);
router.get('/', getAllExams);
router.get('/teacher/:teacherId', getExamsByTeacher); // New route
router.get('/:id', getExamById);
router.put('/:id', upload.single('file'), updateExam);
router.delete('/:id', deleteExam);

export default router;