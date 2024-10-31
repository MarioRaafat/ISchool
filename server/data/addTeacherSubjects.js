import models from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();
const { Teacher, TeacherSubjects } = models;


const addTeacherSubjects = async () => {
	const teachers = await Teacher.findAll({ include: 'Classes' });

	for (const teacher of teachers) {
		for (const class_ of teacher.Classes) {
			const subjects = await class_.getSubjects();
			for (const subject of subjects) {
				if (subject === null) {
					continue;
				}
				await TeacherSubjects.create({
					teacher_id: teacher.id,
					subject_id: subject.id
				});
				console.log(`Subject ${subject.name} added to Teacher ${teacher.firstName} ${teacher.lastName}`);
			}
		}
	}
};

addTeacherSubjects();
