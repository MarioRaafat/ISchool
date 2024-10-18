import models from '../models/index.js';
import multer from 'multer';

const { Exam } = models;

// Configure multer for file uploads
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/exams');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	}
});
const upload = multer({ storage });

// Create a new exam
export const createExam = async (req, res) => {
	const { name, startTime, endTime, maxGrade, description, teacher_id, class_id } = req.body;
	const filePath = req.file ? req.file.path : null;
	try {
		const exam = await Exam.create({ name, startTime, endTime, maxGrade, description, filePath, teacher_id, class_id });
		res.status(201).json(exam);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error creating exam' });
	}
};

// Get all exams
export const getAllExams = async (req, res) => {
	try {
		const exams = await Exam.findAll();
		res.status(200).json(exams);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error getting exams' });
	}
};

// Get a single exam by ID
export const getExamById = async (req, res) => {
	const { id } = req.params;
	try {
		const exam = await Exam.findByPk(id);
		if (exam) {
			res.status(200).json(exam);
		} else {
			res.status(404).json({ message: 'Exam not found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error getting exam' });
	}
};

// Update an exam by ID
export const updateExam = async (req, res) => {
	const { id } = req.params;
	const { name, startTime, endTime, maxGrade, description, teacher_id, class_id } = req.body;
	const filePath = req.file ? req.file.path : null;
	try {
		const exam = await Exam.findByPk(id);
		if (exam) {
			exam.name = name;
			exam.startTime = startTime;
			exam.endTime = endTime;
			exam.maxGrade = maxGrade;
			exam.description = description;
			exam.filePath = filePath;
			exam.teacher_id = teacher_id;
			exam.class_id = class_id;
			await exam.save();
			res.status(200).json(exam);
		} else {
			res.status(404).json({ message: 'Exam not found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error updating exam' });
	}
};

// Delete an exam by ID
export const deleteExam = async (req, res) => {
	const { id } = req.params;
	try {
		const exam = await Exam.findByPk(id);
		if (exam) {
			await exam.destroy();
			res.status(200).json({ message: 'Exam deleted successfully' });
		} else {
			res.status(404).json({ message: 'Exam not found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error deleting exam' });
	}
};

export { upload };