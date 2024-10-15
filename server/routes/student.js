import express from 'express';
import models from '../models/index.js';

const { Student, Grade, Class } = models;

const router = express.Router();

// create a student
router.post('/student', async (req, res) => {
	const { name, gender, email, password, className, level } = req.body;
	try {
		// Get the grade by level
		const grade = await Grade.findOne({ where: { level } });

		if (!grade) {
			return res.status(404).json({ error: 'Grade not found' });
		}

		// Get the class by name
		const class_ = await Class.findOne({ where: { name: className } });

		if (!class_) {
			return res.status(404).json({ error: 'Class not found' });
		}

		const student = await Student.create({name, gender, email, password, class_id: class_.id, grade_id: grade.id });
		res.json(student);
		console.log('Student created');
	} catch (err) {
		console.log(err);
		res.status(500).send('Error creating student');
	}
});

// get all students
router.get('/students', async (req, res) => {
	try {
		const students = await Student.findAll();
		res.send(students);
	} catch (err) {
		console.log(err);
		res.status(500).send('Error fetching students');
	}
});

// get a student by id
router.get('/student/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const student = await Student.findByPk(id);
		res.send(student);
	} catch (err) {
		console.log(err);
		res.status(500).send('Error fetching student');
	}
});

// get a student by email
router.get('/student', async (req, res) => {
	const { email } = req.query;
	try {
		const student = await Student.findOne({ where: { email } });
		res.send(student);
	} catch (err) {
		console.log(err);
		res.status(500).send('Error fetching student');
	}
});


export default router;