import express from 'express';
import models from '../models/index.js';

const { Student, Grade, Class } = models;

const router = express.Router();

// create a student
router.post('/student', async (req, res) => {
	const { name, gender, email, password, class_id, grade_id } = req.body;
	try {
		const student = await Student.create({ name, gender, email, password, class_id, grade_id });
		res.send('Student created successfully');
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

// get students by class
router.get('/students/class/:class_id', async (req, res) => {
	const { class_id } = req.params;
	try {
		const students = await Student.findAll({ where: { class_id } });
		res.send(students);
	} catch (err) {
		console.log(err);
		res.status(500).send('Error fetching students');
	}
});

// get students by grade level
router.get('/students/grade/:level', async (req, res) => {
	const { level } = req.params;
	try {
		const grade = await Grade.findOne({ where: { level } });
		const students = await Student.findAll({ where: { grade_id: grade.id } });
		res.send(students);
	} catch (err) {
		console.log(err);
		res.status(500).send('Error fetching students');
	}
});

export default router;