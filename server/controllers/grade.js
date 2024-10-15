import express from 'express';
import models from '../models/index.js';

const { Grade } = models;
const router = express.Router();

// create a grade
router.post('/grade', async (req, res) => {
	const { level } = req.body;
	try {
		const grade = await Grade.create({ level });
		res.json(grade);
		console.log('Grade created');
	} catch (err) {
		console.error(err);
		res.status(500).send('Error creating grade');
	}
});

router.get('/grade', async (req, res) => {
	try {
		const grades = await Grade.findAll()
		res.json(grades);
	} catch (err) {
		console.error(err);
		res.status(500).send('error returning grade');
	}
})

export default router;