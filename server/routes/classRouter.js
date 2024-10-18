import express from 'express';
import { createClass, getAllClasses, getClassByName } from '../controllers/classController.js';

const router = express.Router();

// Create class
router.post('/', createClass);

// Get all classes
router.get('/', getAllClasses);

// Get a class by name
router.get('/:name', getClassByName);

export default router;