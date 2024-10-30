import models from '../models/index.js';
import multer from 'multer';

const { Exam, Student } = models;

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

export const getExamsByStudent = async (req, res) => {
	const { studentId } = req.params;
	try {
		const student = await Student.findByPk(studentId);
		if (!student) {
			return res.status(404).json({ message: 'Student not found' });
		}
		const classId = student.class_id;
		const exams = await Exam.findAll({ where: { class_id: classId } });
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

export const getUpcomingExams = async (req, res) => {
	const { studentId } = req.body;
	const now = new Date();
	try {
		const student = await Student.findByPk(studentId);
		if (!student) {
			return res.status(404).json({ message: 'Student not found' });
		}
		const classId = student.class_id;
		const exams = await Exam.findAll({ where: { class_id: classId } });
		const nextExams = exams
			.filter(exam => exam.startDate >= now)
			.map(exam => {
				const date = exam.startDate.toString().slice(0, 10);
				let [startHours, startMinutes] = exam.startDate.toString().slice(16, 21).split(':');
				let [endHours, endMinutes] = exam.endDate.toString().slice(16, 21).split(':');
				const startPeriod = startHours >= 12 ? 'PM' : 'AM';
				const endPeriod = endHours >= 12 ? 'PM' : 'AM';
				startHours = startHours % 12;
				endHours = endHours % 12;

				return {
					name: exam.name,
					date,
					startTime: `${startHours}:${startMinutes} ${startPeriod}`,
					endTime: `${endHours}:${endMinutes} ${endPeriod}`,
					examDate: exam.startDate
				};
			})
			.sort((a, b) => a.examDate - b.examDate) // ascending
			.slice(0, 3);

		res.status(200).json(nextExams);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error fetching exams' });
	}
}

export const getLastExams = async (req, res) => {
	const { classId } = req.body;
	const now = new Date();
	try {
		const exams = await Exam.findAll({ where: { class_id: classId } });
		const lastExams = exams
			.filter(exam => exam.endDate < now)
			.map(exam => {
				const date = exam.startDate.toString().slice(0, 10);
				let [startHours, startMinutes] = exam.startDate.toString().slice(16, 21).split(':');
				let [endHours, endMinutes] = exam.endDate.toString().slice(16, 21).split(':');
				const startPeriod = startHours >= 12 ? 'PM' : 'AM';
				const endPeriod = endHours >= 12 ? 'PM' : 'AM';
				startHours = startHours % 12;
				endHours = endHours % 12;

				return {
					name: exam.name,
					date,
					startTime: `${startHours}:${startMinutes} ${startPeriod}`,
					endTime: `${endHours}:${endMinutes} ${endPeriod}`,
					examDate: exam.startDate
				};
			})
			.sort((a, b) => b.examDate - a.examDate) // descending

		res.status(200).json(lastExams);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error fetching exams' });
	}
}


export { upload };