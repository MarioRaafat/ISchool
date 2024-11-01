import express from 'express';
import {
    getResultsByStudent,
    getResultsByTeacher,
    getRankByStudent,
    getAverageResultsByTeacher,
} from '../controllers/resultsController.js';
import {verifyToken} from "../middlewares/verifyToken.js";

const router = express.Router();

router.post('/student', verifyToken, getResultsByStudent);
router.post('/teacher', verifyToken, getResultsByTeacher);
router.post('/student/rank', verifyToken, getRankByStudent);
router.post('/student/exam/rank', verifyToken, getRankByStudent);
router.post('/student/assignment/rank', verifyToken, getRankByStudent);

router.post('/teacher/average', verifyToken, getAverageResultsByTeacher);

export default router;