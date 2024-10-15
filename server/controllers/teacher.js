import express from 'express';
import model from '../models/index.js';

const { Teacher } = model;

const router = express.Router();

// create a teacher
router.post('/teacher', async (req, res) => {
	const { name, email, password, gender, phone } = req.body;
	try {
		const teacher = await Teacher.create({ name, email, password, gender, phone });
		res.send('Teacher created successfully');
	} catch (err) {
		console.log(err);
		res.status(500).send('Error creating teacher');
	}
});

// get all teachers
router.get('/teachers', async (req, res) => {
	try {
		const teachers = await Teacher.findAll();
		res.send(teachers);
	} catch (err) {
		console.log(err);
		res.status(500).send('Error fetching teachers');
	}
});

// get a teacher by id
router.get('/teacher/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const teacher = await Teacher.findByPk(id);
		res.send(teacher);
	} catch (err) {
		console.log(err);
		res.status(500).send('Error fetching teacher');
	}
});

// get a teacher by email
router.get('/teacher', async (req, res) => {
	const { email } = req.query;
	try {
		const teacher = await Teacher.findOne({ where: { email } });
		res.send(teacher);
	} catch (err) {
		console.log(err);
		res.status(500).send('Error fetching teacher');
	}
});

// get a teacher by phone
router.get('/teacher', async (req, res) => {
	const { phone } = req.query;
	try {
		const teacher = await Teacher.findOne({ where: { phone } });
		res.send(teacher);
	} catch (err) {
		console.log(err);
		res.status(500).send('Error fetching teacher');
	}
});

export default router;