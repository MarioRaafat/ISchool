import models from '../models/index.js';

const { Subject, Class, Grade } = models;

// Create class
export const createClass = async (req, res) => {
	const { name, level } = req.body;

	try {
		// Get the grade by level
		const grade = await Grade.findOne({ where: { level } });

		if (!grade) {
			return res.status(404).json({ error: 'Grade not found' });
		}

		// Create the class with the grade_id
		const newClass = await Class.create({ name, grade_id: grade.id });

		res.json(newClass);
		console.log('A new Class has been created');
	} catch (err) {
		console.error(err);
		res.status(500).send('Error creating class');
	}
};

// Get all classes
export const getAllClasses = async (req, res) => {
	try {
		const classes = await Class.findAll();
		res.json(classes);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error fetching classes');
	}
};

// Get a class by name
export const getClassByName = async (req, res) => {
	const { name } = req.params;
	try {
		const class_ = await Class.findOne({ where: { name } });
		res.json(class_);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error fetching class');
	}
};

export const addSubjectToClass = async (req, res) => {
	const { classId, subjectId } = req.body;
	try {
		const classInstance = await Class.findByPk(classId);
		const subjectInstance = await Subject.findByPk(subjectId);
		if (classInstance && subjectInstance) {
			await classInstance.addSubject(subjectInstance);
			res.status(200).json({ message: 'Subject added to class successfully' });
		} else {
			res.status(404).json({ message: 'Class or Subject not found' });
		}
	} catch (error) {
		res.status(500).json({ message: 'An error occurred', error });
	}
};

export const getSubjectsByClass = async (req, res) => {
	const { classId } = req.body;
	console.log(classId);
	try {
		const classInstance = await Class.findByPk(classId);
		if (classInstance) {
			const subjects = await classInstance.getSubjects();
			// note: this is not the best way to return the subjects, you should return only the required fields
			// and not the entire object
			// it will be better to do something like the format that was used in AuthController.js
			res.status(200).json(subjects);
		} else {
			res.status(404).json({ message: 'Class not found' });
		}
	} catch (error) {
		res.status(500).json({ message: 'An error occurred', error });
	}
}

