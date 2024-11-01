import models from '../models/index.js';
import dotenv from 'dotenv';
import faker from 'faker';

dotenv.config();
const { Exam, Class, Teacher } = models;

const addExams = async () => {
    try {
        const classes = await Class.findAll({ include: 'Teachers' });
        const startDateRange = new Date('2024-10-01');
        const endDateRange = new Date();

        for (const class_ of classes) {
            const teachers = class_.Teachers;
            for (const teacher of teachers) {
                console.log(`this is teacher: ${teacher.firstName} ${teacher.lastName}`);
                for (let i = 0; i < 2; i++) {
                    const examName = faker.lorem.words(3);
                    const startDate = faker.date.between(startDateRange, endDateRange).toISOString();
                    const endDate = faker.date.between(startDateRange, endDateRange).toISOString();
                    const maxGrade = faker.datatype.number({ min: 20, max: 60 });
                    const description = faker.lorem.sentence();


                    const exam = new Exam({
                        name: examName,
                        startDate,
                        endDate,
                        maxGrade,
                        description,
                        teacher_id: teacher.id,
                        class_id: class_.id
                    });
                    await exam.save();
                    console.log(`Exam ${examName} added to the database for Class ${class_.name}`);
                }
            }
        }
    } catch (err) {
        console.log(`Error: ${err}`);
    }
};

addExams();