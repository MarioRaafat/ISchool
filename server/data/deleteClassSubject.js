import models from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();
const { ClassSubjects } = models;

const clearClassSubjectData = async () => {
    try {
        // Delete all rows in the ClassSubject table
        await ClassSubjects.destroy({
            where: {},
            truncate: true
        });

        console.log('All data in the ClassSubject table has been cleared.');
    } catch (err) {
        console.log(`Error: ${err}`);
    }
};

clearClassSubjectData();