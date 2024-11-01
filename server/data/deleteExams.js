import models from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();
const { Exam, Result } = models;

const clearExams = async () => {
    try {
        // Delete results related to exams
        await Result.destroy({
            where: {
                exam_id: {
                    [models.Sequelize.Op.ne]: null
                }
            }
        });

        // Delete all exams
        await Exam.destroy({
            where: {}
        });

        console.log('All data in the Exam table and related data in the Result table have been cleared.');
    } catch (err) {
        console.log(`Error: ${err}`);
    }
};

clearExams();