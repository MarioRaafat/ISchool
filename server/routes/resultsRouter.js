import express from 'express';
import {
    getResultsByStudent,
    getResultsByTeacher,
    getRankByStudent,
    getAverageResultsByTeacher,
} from '../controllers/resultsController.js';

const router = express.Router();

router.post('/student', getResultsByStudent);
router.post('/teacher', getResultsByTeacher);
router.post('/student/rank', getRankByStudent);
router.post('/teacher/average', getAverageResultsByTeacher);

export default router;