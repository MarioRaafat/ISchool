import models from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();
const { Assignment, Result } = models;

const clearAssignments = async () => {
    try {
        // Delete results related to assignments
        await Result.destroy({
            where: {
                assignment_id: {
                    [models.Sequelize.Op.ne]: null
                }
            }
        });

        // Delete all assignments
        await Assignment.destroy({
            where: {}
        });

        console.log('All data in the Assignment table and related data in the Result table have been cleared.');
    } catch (err) {
        console.log(`Error: ${err}`);
    }
};

clearAssignments();