import models from '../models/index.js';
import multer from 'multer';

const { Assignment, Student, Teacher } = models;

// Configure multer for file uploads
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/assignments');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	}
});
const upload = multer({ storage });

// Create a new assignment
export const createAssignment = async (req, res) => {
	const { name, startDate, endDate, maxGrade, description, teacher_id, class_id } = req.body;
	const filePath = req.file ? req.file.path : null;
	try {
		const assignment = await Assignment.create({ name, startDate, endDate, maxGrade, description, filePath, teacher_id, class_id });
		res.status(201).json(assignment);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error creating assignment' });
	}
};

// Get all assignments
export const getAllAssignments = async (req, res) => {
	try {
		const assignments = await Assignment.findAll();
		res.status(200).json(assignments);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error getting assignments' });
	}
};

// Get a single assignment by ID
export const getAssignmentById = async (req, res) => {
	const { id } = req.params;
	try {
		const assignment = await Assignment.findByPk(id);
		if (assignment) {
			res.status(200).json(assignment);
		} else {
			res.status(404).json({ message: 'Assignment not found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error getting assignment' });
	}
};

// Update an assignment by ID
export const updateAssignment = async (req, res) => {
	const { id } = req.params;
	const { name, startDate, endDate, maxGrade, description, teacher_id, class_id } = req.body;
	const filePath = req.file ? req.file.path : null;
	try {
		const assignment = await Assignment.findByPk(id);
		if (assignment) {
			assignment.name = name;
			assignment.startDate = startDate;
			assignment.endDate = endDate;
			assignment.maxGrade = maxGrade;
			assignment.description = description;
			assignment.filePath = filePath;
			assignment.teacher_id = teacher_id;
			assignment.class_id = class_id;
			await assignment.save();
			res.status(200).json(assignment);
		} else {
			res.status(404).json({ message: 'Assignment not found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error updating assignment' });
	}
};

// Delete an assignment by ID
export const deleteAssignment = async (req, res) => {
	const { id } = req.params;
	try {
		const assignment = await Assignment.findByPk(id);
		if (assignment) {
			await assignment.destroy();
			res.status(200).json({ message: 'Assignment deleted successfully' });
		} else {
			res.status(404).json({ message: 'Assignment not found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error deleting assignment' });
	}
};


export const getAssignmentsByStudent = async (req, res) => {
	const { studentId } = req.params;
	try {
		const student = await Student.findByPk(studentId);
		if (!student) {
			return res.status(404).json({ message: 'Student not found' });
		}
		const classId = student.class_id;
		const assignments = await Assignment.findAll({ where: { class_id: classId } });
		const filteredAssignments = assignments.map(assignment => ({
			id: assignment.id,
			name: assignment.name,
			description: assignment.description,
			date: assignment.startDate.toString().slice(0, 10),
			startTime: assignment.startDate.toString().slice(16, 21),
			endTime: assignment.endDate.toString().slice(16, 21),
			maxGrade: assignment.maxGrade,
			file: assignment.filePath,
		}));

		res.status(200).json(filteredAssignments);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error fetching assignments' });
	}
};

export const getAssignmentsByTeacher = async (req, res) => {
	const { teacherId } = req.params;
	try {
		const assignments = await Assignment.findAll({ where: { teacher_id: teacherId } });
		const filteredAssignments = assignments.map(assignment => ({
			id: assignment.id,
			name: assignment.name,
			description: assignment.description,
			date: assignment.startDate.toString().slice(0, 10),
			startTime: assignment.startDate.toString().slice(11, 16),
			endTime: assignment.endDate.toString().slice(11, 16),
			maxGrade: assignment.maxGrade,
			file: assignment.filePath,
		}));

		res.status(200).json(filteredAssignments);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error fetching assignments' });
	}
};

export const getUpcomingAssignments = async (req, res) => {
	const { studentId } = req.body;
	const now = new Date();
	try {
		const student = await Student.findByPk(studentId);
		if (!student) {
			return res.status(404).json({ message: 'Student not found' });
		}
		const classId = student.class_id;
		const assignments = await Assignment.findAll({ where: { class_id: classId } });
		const nextAssignments = assignments
			//.filter(assignment => assignment.startDate >= now)
			.map(assignment => {
				const date = assignment.startDate.toString().slice(0, 10);
				let [startHours, startMinutes] = assignment.startDate.toString().slice(16, 21).split(':');
				let [endHours, endMinutes] = assignment.endDate.toString().slice(16, 21).split(':');
				const startPeriod = startHours >= 12 ? 'PM' : 'AM';
				const endPeriod = endHours >= 12 ? 'PM' : 'AM';
				startHours = startHours % 12;
				endHours = endHours % 12;

				return {
					name: assignment.name,
					date,
					description: assignment.description,
					maxGrade: assignment.maxGrade,
					startTime: `${startHours}:${startMinutes} ${startPeriod}`,
					endTime: `${endHours}:${endMinutes} ${endPeriod}`,
					assignmentDate: assignment.startDate
				};
			})
			.sort((a, b) => a.assignmentDate - b.assignmentDate) // ascending


		res.status(200).json(nextAssignments);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error fetching assignments' });
	}
}

export const getLastAssignments = async (req, res) => {
	const { classId } = req.body;
	const now = new Date();
	try {
		const assignments = await Assignment.findAll({ where: { class_id: classId } });
		const lastAssignments = assignments
			.filter(assignment => assignment.endDate < now)
			.map(assignment => {
				const date = assignment.startDate.toString().slice(0, 10);
				let [startHours, startMinutes] = assignment.startDate.toString().slice(16, 21).split(':');
				let [endHours, endMinutes] = assignment.endDate.toString().slice(16, 21).split(':');
				const startPeriod = startHours >= 12 ? 'PM' : 'AM';
				const endPeriod = endHours >= 12 ? 'PM' : 'AM';
				startHours = startHours % 12;
				endHours = endHours % 12;

				return {
					name: assignment.name,
					date,
					startTime: `${startHours}:${startMinutes} ${startPeriod}`,
					endTime: `${endHours}:${endMinutes} ${endPeriod}`,
					assignmentDate: assignment.startDate
				};
			})
			.sort((a, b) => b.assignmentDate - a.assignmentDate) // descending

		res.status(200).json(lastAssignments);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error fetching assignments' });
	}
}

export { upload };