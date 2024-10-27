import dotenv from 'dotenv';
import models from '../models/index.js';

dotenv.config();
const { Grade, Class, Subject } = models;

const linkSubjectsToClasses = async () => {
	try {
		// Fetch grades with associated classes and subjects
		console.log('Linking subjects to classes...');
		const grades = await Grade.findAll({
			include: [
				{ model: Class, as: 'Classes' },
				{ model: Subject, as: 'Subjects' }
			]
		});

		console.log('Grades fetched');
		for (const grade of grades) {
			console.log(`Linking subjects to grade ${grade.level}`);
			const classes = grade.Classes;
			const subjects = grade.Subjects;

			if (!classes || classes.length === 0) {
				console.log(`No classes found for grade ${grade.level}`);
				continue;
			}

			if (!subjects || subjects.length === 0) {
				console.log(`No subjects found for grade ${grade.level}`);
				continue;
			}

			for (const _class of classes) {
				for (const subject of subjects) {
					await _class.addSubject(subject);
					console.log(`Subject ${subject.name} linked to class ${_class.name}`);
				}
			}
			console.log(`Subjects linked to all classes in grade ${grade.level}`);
		}

	} catch (err) {
		console.log(`Error: ${err}`);
	}
};

linkSubjectsToClasses();