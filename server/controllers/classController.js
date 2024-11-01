import models from '../models/index.js';

const { Class, Subject, ClassSubjects, Grade, Teacher, ClassTeachers, Student} = models;

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

// Add subject to class with startTime, endTime, and day
export const addSubjectToClass = async (req, res) => {
	const { classId, subjectId, startTime, endTime, day } = req.body;
	try {
		const classInstance = await Class.findByPk(classId);
		const subjectInstance = await Subject.findByPk(subjectId);
		if (classInstance && subjectInstance) {
			await classInstance.addSubject(subjectInstance, {
				through: {
					startTime,
					endTime,
					day
				}
			});
			res.status(200).json({ message: 'Subject added to class successfully' });
		} else {
			res.status(404).json({ message: 'Class or Subject not found' });
		}
	} catch (error) {
		res.status(500).json({ message: 'An error occurred', error });
	}
};

// Get subjects by class
export const getStudentSubjects = async (req, res) => {
	const { classId } = req.body;
	try {
		const classInstance = await Class.findByPk(classId);

		if (classInstance) {
			const subjects = await classInstance.getSubjects({
				through: {
					model: ClassSubjects,
					attributes: ['startTime', 'endTime', 'day']
				}
			});
			res.status(200).json(subjects);
		} else {
			res.status(404).json({ message: 'Class not found' });
		}
	} catch (error) {
		res.status(500).json({ message: 'An error occurred', error });
	}
};

export const getStudentClass = async (req, res) => {
	const {classId} = req.body;
	try {
		const class_ = await Class.findByPk(classId);
		res.status(200).json(class_);
	} catch (error) {
		res.status(500).json({ message: 'An error occurred', error });
	}
};

export const getTeacherSubjects = async (req, res) => {
	const { teacherId } = req.body;
	try {
		const teacher = await Teacher.findByPk(teacherId, {include: 'Subjects'});
		if (!teacher) {
			return res.status(404).json({ message: 'Teacher not found' });
		}
		const courses = teacher.Subjects;

		res.status(200).json(courses);
	} catch (error) {
		res.status(500).json({ message: 'An error occurred', error });
	}
}

export const getUpcomingCourses = async (req, res) => {
	const { classId } = req.body;
	const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const now = new Date();
	const currentDayIndex = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
	const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: "hh:mm AM/PM"

	try {
		const classInstance = await Class.findByPk(classId);
		let courses;
		if (classInstance) {
			 courses = await classInstance.getSubjects({
				through: {
					model: ClassSubjects,
					attributes: ['startTime', 'endTime', 'day']
				}
			});

			const nextCourses = courses
				.map(course => {
					const courseDate = new Date(now);
					const courseDayIndex = weekDays.indexOf(course.day);
					const timeParts = course.startTime.split(' '); // Split time and period (AM/PM)
					const [hours, minutes] = timeParts[0].split(':').map(Number);
					const period = timeParts[1];

					const adjustedHours = (period === 'PM' && hours < 12) ? hours + 12 : (period === 'AM' && hours === 12) ? 0 : hours;

					courseDate.setDate(now.getDate() + (courseDayIndex >= currentDayIndex ? courseDayIndex - currentDayIndex : courseDayIndex - currentDayIndex + 7));
					courseDate.setHours(adjustedHours, minutes, 0, 0); // Set hours and minutes

					return {
						name: course.name,
						courseDate,
						startTime: course.startTime,
						endTime: course.endTime,
						day: course.day
					};

				})
				.filter(course => course.courseDate >= now)
				.sort((a, b) => a.courseDate - b.courseDate)
				.slice(0, 3);

			res.status(200).json(nextCourses);
		} else {
			res.status(404).json({ message: 'Class not found' });
		}
	} catch (error) {
		res.status(500).json({ message: 'An error occurred', error });
	}
}

export const getStudentsInClass = async (req, res) => {
	const { classId } = req.body;

	try {
		const classInstance = await Class.findByPk(classId, {
			include: [{ model: Student, as: 'Students' }]
		});

		if (!classInstance) {
			return res.status(404).json({ message: 'Class not found' });
		}

		const students = classInstance.Students.map(student => ({
			id: student.id,
			name: student.firstName + ' ' + student.lastName,
			email: student.email
		}));

		res.status(200).json(students);
	} catch (error) {
		console.error('Error fetching students:', error);
		res.status(500).json({ message: 'Error fetching students' });
	}
};

export const getClassesByTeacher = async (req, res) => {
	const { teacherId } = req.body;

	try {
		const teacher = await Teacher.findByPk(teacherId, {
			include: [{ model: Class, as: 'Classes' }]
		});

		if (!teacher) {
			return res.status(404).json({ message: 'Teacher not found' });
		}

		const classes = teacher.Classes.map(class_ => ({
			id: class_.id,
			name: class_.name,
			description: class_.description,
			avatar: class_.avatar
		}));

		res.status(200).json(classes);
	} catch (error) {
		console.error('Error fetching classes:', error);
		res.status(500).json({ message: 'Error fetching classes' });
	}
};