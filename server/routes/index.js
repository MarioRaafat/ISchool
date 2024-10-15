import express from 'express';
import teacherController from '../controllers/teacher.js';
import gradeController from '../controllers/grade.js';
import studentController from '../controllers/student.js';
import classController from '../controllers/class.js';

const router = express.Router();

router.use(teacherController);
router.use(studentController);
router.use(gradeController);
router.use(classController);

export default router;