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
	const { name, startDate, endDate, maxGrade, description, teacher_id, class_id } = req.body;
	const filePath = req.file ? req.file.path : null;
	try {
		const exam = await Exam.create({ name, startDate, endDate, maxGrade, description, filePath, teacher_id, class_id });
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
	const { name, startDate, endDate, maxGrade, description, teacher_id, class_id } = req.body;
	const filePath = req.file ? req.file.path : null;

	if (!name || !startDate || !description || !endDate) { // don't forget to add the new fields [maxGrade, class_id]
		return res.status(400).json({message: 'All fields are required'});
	}

	try {
		const exam = await Exam.findByPk(id);
		if (!exam) {
			return res.status(404).json({ message: 'Exam not found' });
		}

		console.log('Updating exam:', exam);

		exam.name = name;
		exam.maxGrade = maxGrade;
		exam.description = description;
		exam.filePath = filePath;
		exam.startDate = startDate;
		exam.endDate = endDate;
		exam.class_id = class_id;

		await exam.save();

		// Return filtered exam fields
		const filteredExam = {
			id: exam.id,
			name: exam.name,
			description: exam.description,
			date: exam.startDate ? exam.startDate.toISOString().slice(0, 10) : null,
			startTime: exam.startDate ? exam.startDate.toISOString().slice(11, 16) : null,
			endTime: exam.endDate ? exam.endDate.toISOString().slice(11, 16) : null,
			file: exam.filePath,
		};

		res.status(200).json(filteredExam);

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

// Get all exams for a specific teacher
export const getExamsByTeacher = async (req, res) => {
	const { teacherId } = req.params;
	try {
		const exams = await Exam.findAll({ where: { teacher_id: teacherId } });
		const filteredExams = exams.map(exam => ({
			id: exam.id,
			name: exam.name,
			description: exam.description,
			date: exam.startDate.toString().slice(0, 10),
			startTime: exam.startDate.toString().slice(16, 21),
			endTime: exam.endDate.toString().slice(16, 21),
			file: exam.filePath,
		}));

		res.status(200).json(filteredExams);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error fetching exams' });
	}
};

export { upload };