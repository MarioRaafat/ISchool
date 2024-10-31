import models from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();
const { Teacher, TeacherSubjects, ClassSubjects } = models;

const addTeacherSubjects = async () => {
	const teachers = await Teacher.findAll({
		include: 'Classes'
	});
	const visitedSubjects = [];

	for (const teacher of teachers) {
		for (const class_ of teacher.Classes) {
			console.log("this is class:", class_.name);
			const subjectClass = await ClassSubjects.findAll({
				where: { class_id: class_.id },
				include: 'Subject'
			});

			const subjects = subjectClass.map(sc => sc.Subject);

			for (const subject of subjects) {
				console.log("this is subject: ", subject.name);
				if (!subject) {
					continue;
				}
				if (visitedSubjects.includes(subject.id)) {
					continue;
				}

				// Add teacher and subject to TeacherSubjects table
				await TeacherSubjects.create({
					teacher_id: teacher.id,
					subject_id: subject.id
				});

				visitedSubjects.push(subject.id);

				console.log(`Subject ${subject.name} added to Teacher ${teacher.last_name} ${teacher.first_name}`);
				break;
			}
		}
	}
};

addTeacherSubjects();