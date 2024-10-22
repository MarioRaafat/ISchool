import express from 'express';
import { createClass, getAllClasses, getClassByName, addSubjectToClass, getSubjectsByClass } from '../controllers/classController.js';

const router = express.Router();

// Create class
router.post('/', createClass); // why !!!

// Get all classes
router.get('/', getAllClasses); // also why !!!

// Get a class by name
router.get('/:name', getClassByName);

//add subject to class
router.get('/add_subject', addSubjectToClass);

//get all subjects in a class
router.post('/courses', getSubjectsByClass);

export default router;