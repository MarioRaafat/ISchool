import models from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();
const { Class, Subject } = models;

const addClassSubjects = async () => {
	try {
		const classes = await Class.findAll();

		for (const class_ of classes) {
			const subjects = await Subject.findAll({ where: { grade_id: class_.grade_id }});
			for (const subject of subjects) {
				await class_.addSubject(subject);
				console.log(`Subject ${subject.name} added to Class ${class_.name}`);
			}
		}
	} catch (err) {
		console.log(`Error: ${err}`);
	}
};

addClassSubjects();