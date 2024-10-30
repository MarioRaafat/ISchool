import models from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();
const { Teacher, Class, ClassTeachers } = models;

const addClassTeachers = async () => {
	try {
		console.log('Adding teachers to classes...');
		const teachers = await Teacher.findAll();
		const classes = await Class.findAll();
		console.log('Teachers and classes fetched.');
		let classIndex = 0;

		for (const teacher of teachers) {
			let assignedClasses = 0;

			while (assignedClasses < 2 && classIndex < classes.length) {
				const class_ = classes[classIndex];

				await ClassTeachers.create({
					class_id: class_.id,
					teacher_id: teacher.id
				});

				console.log(`Teacher ${teacher.firstName} ${teacher.lastName} assigned to Class ${class_.name}`);

				assignedClasses++;
				classIndex++;

				// If we reach the end of the classes array, start over
				if (classIndex >= classes.length) {
					classIndex = 0;
				}
			}
		}

		console.log('All teachers have been assigned to classes.');
	} catch (err) {
		console.log(`Error: ${err}`);
	}
};

addClassTeachers();