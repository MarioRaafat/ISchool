// server/routes/examRouter.js
import express from 'express';
import { createExam, getAllExams, getExamById, updateExam, deleteExam, getExamsByTeacher } from '../controllers/examController.js';
import multer from "multer";

const router = express.Router();
const upload = multer({dest: "uploads/files/exams"});

router.post('/create', upload.single('file'), createExam);
router.get('/', getAllExams);
router.get('/teacher/:teacherId', getExamsByTeacher); // New route
router.get('/:id', getExamById);
router.put('/:id', upload.single('file'), updateExam);
router.delete('/delete/:id', deleteExam);

export default router;