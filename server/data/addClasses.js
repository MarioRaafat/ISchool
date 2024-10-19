// add 2 classes for each grade from 1 to 12
import models from '../models/index.js';
// load environment variables
import dotenv from 'dotenv';

dotenv.config();
const { Grade, Class } = models;

const addClasses = async () => {
	try {
		const grades = await Grade.findAll();
		for (const grade of grades) {
			for (let i = 1; i <= 2; i++) {
				const className = `Class ${grade.level}-${i}`;
				const newClass = new Class({
					name: className,
					grade_id: grade.id
				});

				await newClass.save();
				console.log(`Class ${className} added to the database for Grade ${grade.level}`);
			}
		}
	} catch (err) {
		console.log(`Error: ${err}`);
	}
};

addClasses();