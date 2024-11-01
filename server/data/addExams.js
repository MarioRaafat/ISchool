import models from '../models/index.js';
import dotenv from 'dotenv';
import faker from 'faker';

dotenv.config();
const { Exam, Class, Teacher } = models;

const addExams = async () => {
  try {
    const classes = await Class.findAll({include: 'Teachers'});
    for (const class_ of classes) {
      const teachers = class_.Teachers;
      for (const teacher of teachers) {
        console.log(`Teacher ${teacher.last_name} ${teacher.first_name} is teaching Class ${class_.name}`);
        for (let i = 0; i < 3; i++) {
          const examName = faker.lorem.words(3);
          const startDate = faker.date.future().toISOString();
          const endDate = faker.date.future().toISOString();
          const maxGrade = faker.datatype.number({ min: 50, max: 100 });
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