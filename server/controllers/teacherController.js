import models from '../models/index.js';

const { Teacher } = models;

// Get teacher by email (indexed)
export const getTeacherByEmail = async (req, res) => {
	try {
		const teacher = await Teacher.findOne({ where: { email: req.params.email } });
		if (teacher) {
			res.status(200).json(teacher);
		} else {
			res.status(404).json({ message: 'Teacher not found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error getting teacher' });
	}
};

// Get all teachers
export const getAllTeachers = async (req, res) => {
	try {
		const teachers = await Teacher.findAll();
		res.status(200).json(teachers);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error getting teachers' });
	}
};

// Create teacher
export const createTeacher = async (req, res) => {
	const { firstName, lastName, gender, password, email, phone } = req.body;
	try {
		const teacher = await Teacher.create({
			firstName,
			lastName,
			gender,
			password,
			email,
			phone
		});
		res.status(201).json(teacher);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error creating teacher' });
	}
};
