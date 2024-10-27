// server/data/deleteClasses.js
import models from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();
const { Class } = models;

const deleteClasses = async () => {
	try {
		await Class.destroy({
			where: {},
			truncate: true
		});
		console.log('All classes have been deleted.');
	} catch (err) {
		console.log(`Error: ${err}`);
	}
};

deleteClasses();