import express from 'express';
import { createAssignment, getAllAssignments, getAssignmentById, updateAssignment, deleteAssignment, upload } from '../controllers/assignmentController.js';

const router = express.Router();

router.post('/', upload.single('file'), createAssignment);
router.get('/', getAllAssignments);
router.get('/:id', getAssignmentById);
router.put('/:id', upload.single('file'), updateAssignment);
router.delete('/:id', deleteAssignment);

export default router;