// server/routes/examRouter.js
import express from 'express';
import {
    createExam,
    getAllExams,
    getExamById,
    updateExam,
    deleteExam,
    getExamsByTeacher,
    getExamsByStudent,
    getUpcomingExams,
    getLastExams,
    getExamResultsByStudent,
    getAvailableExams,
} from '../controllers/examController.js';
import multer from "multer";
import {verifyToken} from "../middlewares/verifyToken.js";

const router = express.Router();
// const upload = multer({dest: "uploads/files/exams"});

router.post('/create', verifyToken, createExam);
router.get('/get-all', verifyToken, getAllExams);
router.get('/teacher/:teacherId', verifyToken, getExamsByTeacher);
router.get('/teacher/available/:teacherId', verifyToken, getAvailableExams);
router.get('/student/:studentId', verifyToken, getExamsByStudent);
router.post('/student/result', verifyToken, getExamResultsByStudent);
router.post('/upcoming', verifyToken, getUpcomingExams);
router.post('/last', verifyToken, getLastExams);
router.get('/:id', verifyToken, getExamById);
router.put('/update/:id', verifyToken, updateExam);
router.delete('/delete/:id', verifyToken, deleteExam);

export default router;