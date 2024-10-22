import models from '../models/index.js';

const { Student, Class, Grade } = models;



// Get student by email (pk)
export const getStudentByEmail = async (req, res) => {
	try {
		const student = await Student.findOne({ where: { email: req.params.email } });
		if (student) {
			res.status(200).json(student);
		} else {
			res.status(404).json({ message: 'Student not found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error getting student' });
	}
};

// Get all students
export const getAllStudents = async (req, res) => {
	try {
		const students = await Student.findAll();
		res.status(200).json(students);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error getting students' });
	}
};

// Create student
export const createStudent = async (req, res) => {
	const { firstName, lastName, gender, password, email, phone, className, level } = req.body;
	try {
		// Get class id, grade id
		const class_id = await Class.findOne({ where: { name: className } });
		const grade_id = await Grade.findOne({ where: { level } });
		if (!class_id || !grade_id) {
			return res.status(404).json({ message: 'Class or grade not found' });
		}

		const student = await Student.create({
			firstName,
			lastName,
			gender,
			password,
			email,
			phone,
			class_id: class_id.id,
			grade_id: grade_id.id
		});
		res.status(201).json(student);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error creating student' });
	}
};

