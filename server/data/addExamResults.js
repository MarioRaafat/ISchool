import models from '../models/index.js';
import dotenv from 'dotenv';
import faker from 'faker';

dotenv.config();
const { Student, Exam, Result, Class } = models;

const addExamResults = async () => {
	try {
		const students = await Student.findAll();
		const exams = await Exam.findAll();
		const classes = await Class.findAll();

		let totalResultCount = 0;

		for (const student of students) {
			const studentClass = classes.find(cls => cls.id === student.class_id);
			if (!studentClass) continue;

			const studentExams = exams.filter(exam => exam.class_id === studentClass.id);
			if (studentExams.length === 0) continue;

			let studentResultCount = 0;

			for (let i = 0; i < Math.min(5, studentExams.length); i++) {
				const exam = studentExams[i];
				const grade = faker.datatype.number({ min: 50, max: 100 });

				const result = new Result({
					grade,
					student_id: student.id,
					exam_id: exam.id
				});

				await result.save();
				studentResultCount++;
				totalResultCount++;
				console.log(`Result for Student ${student.firstName} ${student.lastName} in Exam ${exam.name} added to the database`);

				if (studentResultCount >= 5) break;
			}
		}

		console.log(`Total ${totalResultCount} exam results added to the database.`);
	} catch (err) {
		console.log(`Error: ${err}`);
	}
};

addExamResults();