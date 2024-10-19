import models from '../models/index.js';
import dotenv from 'dotenv';
import faker from 'faker';

dotenv.config();
const { Subject, Grade } = models;

const addSubjects = async () => {
	try {
		const grades = await Grade.findAll();
		for (const grade of grades) {
			for (let i = 1; i <= 6; i++) {
				const subjectName = faker.random.word();

				const subject = new Subject({
					name: subjectName,
					grade_id: grade.id
				});

				await subject.save();
				console.log(`Subject ${subjectName} added to the database for Grade ${grade.level}`);
			}
		}
	} catch (err) {
		console.log(`Error: ${err}`);
	}
};

addSubjects();