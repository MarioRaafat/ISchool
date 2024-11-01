import models from '../models/index.js';
import dotenv from 'dotenv';
import faker from 'faker';

dotenv.config();
const { Teacher } = models;

const updateTeachers = async () => {
	try {
		const teachers = await Teacher.findAll();
		for (const teacher of teachers) {
			const teachingYears = faker.datatype.number({ min: 1, max: 40 });
			const lessonsTaught = faker.datatype.number({ min: 50, max: 1000 });

			teacher.teachingYears = teachingYears;
			teacher.lessonsTaught = lessonsTaught;
			await teacher.save();

			console.log(`Updated Teacher ${teacher.firstName} ${teacher.lastName} with ${teachingYears} years and ${lessonsTaught} lessons taught.`);
		}
	} catch (err) {
		console.log(`Error: ${err}`);
	}
};

updateTeachers();