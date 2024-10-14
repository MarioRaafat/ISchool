import express from 'express';
import teacherRoutes from './teacher.js';
import gradeRoutes from './grade.js';
import studentRoutes from './student.js';

const router = express.Router();

router.use(teacherRoutes);
router.use(studentRoutes);

export default router;