import express from 'express';
import { createClass, getAllClasses, getClassByName, addSubjectToClass, getSubjectsByClass } from '../controllers/classController.js';

const router = express.Router();

// Create class
router.post('/', createClass);

// Get all classes
router.get('/', getAllClasses);

// Get a class by name
router.get('/:name', getClassByName);

// Add subject to class with startTime, endTime, and day
router.post('/add_subject', addSubjectToClass);

// Get all subjects in a class
router.post('/courses', getSubjectsByClass);

export default router;