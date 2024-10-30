import express from 'express';
import {
    createAssignment,
    getAllAssignments,
    getAssignmentById,
    updateAssignment,
    deleteAssignment,
    getLastAssignments,
    getUpcomingAssignments,
    getAssignmentsByTeacher,
    getAssignmentsByStudent,
    upload,
} from '../controllers/assignmentController.js';

const router = express.Router();

router.post('/create', upload.single('file'), createAssignment);
router.get('/get-all', getAllAssignments);
router.get('/:id', getAssignmentById);
router.put('/update/:id', upload.single('file'), updateAssignment);
router.delete('/delete/:id', deleteAssignment);
router.get('/teacher/:teacherId', getAssignmentsByTeacher);
router.get('/student/:studentId', getAssignmentsByStudent);
router.post('/upcoming', getUpcomingAssignments);
router.post('/last', getLastAssignments);

export default router;