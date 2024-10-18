import express from 'express';
import examRouter from './examRouter.js';
import studentRouter from './studentRouter.js';
import teacherRouter from './teacherRouter.js';
import gradeRouter from './gradeRouter.js';
import classRouter from './classRouter.js';
import assignmentRouter from './assignmentRouter.js';

const router = express.Router();

router.use('/teacher', teacherRouter);
router.use('/grade', gradeRouter);
router.use('/student', studentRouter);
router.use('/class', classRouter);
router.use('/assignment', assignmentRouter);
router.use('/exam', examRouter);


export default router;