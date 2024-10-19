import models from '../models/index.js';
import dotenv from 'dotenv';
import faker from 'faker';

dotenv.config();
const { Assignment, Class, Teacher } = models;

const addAssignments = async () => {
	try {
		const classes = await Class.findAll();
		const teachers = await Teacher.findAll();
		for (const class_ of classes) {
			for (let i = 1; i <= 2; i++) {
				const assignmentName = faker.lorem.words(3);
				const startDate = faker.date.future().toISOString();
				const endDate = faker.date.future().toISOString();
				const maxGrade = faker.datatype.number({ min: 50, max: 100 });
				const description = faker.lorem.sentence();
				const teacher = teachers[Math.floor(Math.random() * teachers.length)];

				const assignment = new Assignment({
					name: assignmentName,
					startDate,
					endDate,
					maxGrade,
					description,
					teacher_id: teacher.id,
					class_id: class_.id
				});

				await assignment.save();
				console.log(`Assignment ${assignmentName} added to the database for Class ${class_.name}`);
			}
		}
	} catch (err) {
		console.log(`Error: ${err}`);
	}
};

addAssignments();