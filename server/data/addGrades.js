// add all grades to the database from 1 to 12
import models from '../models/index.js';
//load environment variables
import dotenv from 'dotenv';

dotenv.config();
const { Grade } = models;

for (let i = 4; i <= 12; i++) {
	const grade = new Grade({
		level: i
	});

	grade.save()
		.then(() => {
			console.log(`Grade ${i} added to the database`);
		})
		.catch((err) => {
			console.log(`Error: ${err}`);
		});
}