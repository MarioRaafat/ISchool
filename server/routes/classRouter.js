import express from 'express';
import { createClass, getAllClasses, getClassByName, addSubjectToClass, getSubjectsByClass } from '../controllers/classController.js';

const router = express.Router();

// Create class
router.post('/', createClass);

// Get all classes
router.get('/', getAllClasses);

// Get a class by name
router.get('/:name', getClassByName);

//add subject to calss
router.get('/add_subject', addSubjectToClass);

//get all subjects in a class
router.get('/get_subjects/:classId', getSubjectsByClass);

export default router;