import models from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();
const { Class, Subject } = models;

const addClassSubjects = async () => {
	try {
		const classes = await Class.findAll();
		const subjects = await Subject.findAll();

		for (const class_ of classes) {
			for (const subject of subjects) {
				// Add the subject to the class
				await class_.addSubject(subject);
				console.log(`Subject ${subject.name} added to Class ${class_.name}`);
			}
		}
	} catch (err) {
		console.log(`Error: ${err}`);
	}
};

addClassSubjects();