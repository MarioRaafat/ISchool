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
    getAssignmentResultsByStudent,
    getCurrentAssignments,
    upload,
} from '../controllers/assignmentController.js';
import {verifyToken} from "../middlewares/verifyToken.js";

const router = express.Router();

router.post('/create', verifyToken, upload.single('file'), createAssignment);
router.get('/get-all', getAllAssignments);
router.get('/:id', getAssignmentById);
router.put('/update/:id', verifyToken, upload.single('file'), updateAssignment);
router.delete('/delete/:id', verifyToken, deleteAssignment);
router.get('/teacher/:teacherId', verifyToken, getAssignmentsByTeacher);
router.get('/student/:studentId', verifyToken, getAssignmentsByStudent);
router.post('/student/result', verifyToken, getAssignmentResultsByStudent);
router.post('/current', verifyToken, getCurrentAssignments);
router.post('/upcoming', verifyToken, getUpcomingAssignments);
router.post('/last', verifyToken, getLastAssignments);

export default router;