import models from '../models/index.js';

const { Teacher, Class, ClassSubjects, Result, Exam, Assignment, Subject, ClassTeachers } = models;

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

// Get teacher info
export const getTeacherInfo = async (req, res) => {
	const { id } = req.params;
	try {
		const teacher = await Teacher.findByPk(id);
		if (!teacher) {
			return res.status(404).json({ message: 'Teacher not found' });
		}

		// Assuming you have fields for teaching years and lessons taught
		const teachingYears = teacher.teachingYears;
		const lessonsTaught = teacher.lessonsTaught;

		res.status(200).json({ teachingYears, lessonsTaught });
	} catch (error) {
		console.error('Error fetching teacher info:', error);
		res.status(500).json({ message: 'Error fetching teacher info' });
	}
};

// server/controllers/teacherController.js

// server/controllers/teacherController.js

// Get teacher average performance
export const getTeacherAveragePerformance = async (req, res) => {
	const { teacherId } = req.body;
	try {
		const results = await getResultsByTeacher(teacherId);
		if (!results || results.length === 0) {
			return res.status(200).json({ averagePerformance: 0 });
		}

		let totalGrades = 0;
		let totalMaxGrades = 0;

		const examIds = results.filter(result => result.exam_id).map(result => result.exam_id);
		const assignmentIds = results.filter(result => result.assignment_id).map(result => result.assignment_id);

		const exams = await Exam.findAll({
			where: { id: examIds },
			attributes: ['id', 'maxGrade']
		});

		const assignments = await Assignment.findAll({
			where: { id: assignmentIds },
			attributes: ['id', 'maxGrade']
		});

		const examMap = exams.reduce((acc, exam) => {
			acc[exam.id] = exam.maxGrade;
			return acc;
		}, {});

		const assignmentMap = assignments.reduce((acc, assignment) => {
			acc[assignment.id] = assignment.maxGrade;
			return acc;
		}, {});

		for (const result of results) {
			totalGrades += result.grade;

			if (result.exam_id) {
				totalMaxGrades += examMap[result.exam_id];
			} else if (result.assignment_id) {
				totalMaxGrades += assignmentMap[result.assignment_id];
			}
		}

		const averagePerformance = (totalGrades / totalMaxGrades) * 100;

		res.status(200).json({ averagePerformance });
	} catch (error) {
		console.error('Error fetching teacher average performance:', error);
		res.status(500).json({ message: 'Error fetching teacher average performance' });
	}
};

// Helper function to get results by teacher
const getResultsByTeacher = async (teacherId) => {
	try {
		const exams = await Exam.findAll({ where: { teacher_id: teacherId } });
		const assignments = await Assignment.findAll({ where: { teacher_id: teacherId } });

		const examIds = exams.map(exam => exam.id);
		const assignmentIds = assignments.map(assignment => assignment.id);

		const results = await Result.findAll({
			where: {
				[models.Sequelize.Op.or]: [
					{ exam_id: examIds },
					{ assignment_id: assignmentIds }
				]
			}
		});

		return results;
	} catch (error) {
		console.error('Error fetching results by teacher:', error);
		throw error;
	}
};

// Get teacher upcoming classes
export const getTeacherUpcomingClasses = async (req, res) => {
	const { teacherId } = req.body;
	try {
		const teacher = await Teacher.findByPk(teacherId, { include: 'Classes' });
		if (!teacher) {
			return res.status(404).json({ message: 'Teacher not found' });
		}

		const upcomingClasses = await Promise.all(teacher.Classes.map(async (class_) => {
			const subjects = await class_.getSubjects({
				through: {
					model: ClassSubjects,
					attributes: ['startTime', 'endTime', 'day']
				}
			});

			return subjects.map(subject => ({
				class: class_.name,
				subject: subject.name,
				startTime: subject.ClassSubjects.startTime,
				endTime: subject.ClassSubjects.endTime,
				day: subject.ClassSubjects.day
			}));
		}));

		res.status(200).json({ upcomingClasses });
	} catch (error) {
		console.error('Error fetching teacher upcoming classes:', error);
		res.status(500).json({ message: 'Error fetching teacher upcoming classes' });
	}
};

// server/controllers/teacherController.js

// Get average scores for each class
export const getAverageScoresForClasses = async (req, res) => {
    const { teacherId } = req.body;
    try {
        const classes = await Class.findAll({
            include: [{
                model: Subject,
                as: 'Subjects',
                through: {
                    model: ClassSubjects,
                    attributes: []
                }
            },
            {
                model: Teacher,
                as: 'Teachers',
                through: {
                    model: ClassTeachers,
                    attributes: []
                },
                where: { id: teacherId }
            }],
        });


        const averageScores = await Promise.all(classes.map(async (class_) => {
            const results = await Result.findAll({
                where: {
                    [models.Sequelize.Op.or]: [
                        { '$Exam.class_id$': class_.id },
                        { '$Assignment.class_id$': class_.id }
                    ]
                },
                include: [
                    {
                        model: Exam,
                        as: 'Exam'
                    },
                    {
                        model: Assignment,
                        as: 'Assignment'
                    }
                ]
            });

            const totalGrades = results.reduce((acc, result) => acc + result.grade, 0);
            const totalMaxGrades = results.reduce((acc, result) => acc + (result.Exam ? result.Exam.maxGrade : result.Assignment ? result.Assignment.maxGrade : 0), 0);
            const averageScore = totalMaxGrades > 0 ? (totalGrades / totalMaxGrades) * 100 : 0;

            return {
                class: class_.name,
                score: averageScore.toFixed(2)
            };
        }));

        res.status(200).json({ averageScores });
    } catch (error) {
        console.error('Error fetching average scores for classes:', error);
        res.status(500).json({ message: 'Error fetching average scores for classes' });
    }
};