import models from '../models/index.js';

const { Grade } = models;

// Create a grade
export const createGrade = async (req, res) => {
	const { level } = req.body;
	try {
		const grade = await Grade.create({ level });
		res.json(grade);
		console.log('Grade created');
	} catch (err) {
		console.error(err);
		res.status(500).send('Error creating grade');
	}
};

// Get all grades
export const getAllGrades = async (req, res) => {
	try {
		const grades = await Grade.findAll();
		res.json(grades);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error returning grades');
	}
};

// Get a grade by level
export const getGradeByLevel = async (req, res) => {
	const { level } = req.params;
	try {
		const grade = await Grade.findOne({ where: { level } });
		if (grade) {
			res.status(200).json(grade);
		} else {
			res.status(404).json({ message: 'Grade not found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error getting grade' });
	}
};