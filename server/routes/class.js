import express from 'express';
import models from '../models/index.js';
import { where } from 'sequelize';

const router = express.Router();
const { Class, Grade } = models;

// create class
router.post('/class', async (req, res) => {
	const { name, level } = req.body;

	try {
		// Get the grade by level
		const grade = await Grade.findOne({ where: { level } });

		if (!grade) {
			return res.status(404).json({ error: 'Grade not found' });
		}

		// Create the class with the grade_id
		const newClass = await Class.create({ name, grade_id: grade.id });

		res.json(newClass);
		console.log('A new Class has been created');
	} catch (err) {
		console.error(err);
		res.status(500).send('Error creating class');
	}
});


// get all classes
router.get('/classes', async (req, res) => {
	try {
		const classes = await Class.findAll();
		res.json(classes);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error fetching classes');
	}
});

// get a class by name using two different methods
router.get('/class/:name', async (req, res) => {
	const { name } = req.params;
	try {
		const class_ = await Class.findOne({ where: { name } });
		res.json(class_);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error fetching class');
	}
});


export default router;