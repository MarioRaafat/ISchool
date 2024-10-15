import express from 'express';
import teacherRoutes from './teacher.js';
import gradeRoutes from './grade.js';
import studentRoutes from './student.js';
import classRoutes from './class.js';

const router = express.Router();

router.use(teacherRoutes);
router.use(studentRoutes);
router.use(gradeRoutes);
router.use(classRoutes);

export default router;