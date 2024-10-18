import models from '../models/index.js';
import multer from 'multer';

const { Assignment } = models;

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

export { upload };