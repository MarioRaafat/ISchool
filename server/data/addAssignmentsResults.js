import models from '../models/index.js';
import dotenv from 'dotenv';
import faker from 'faker';

dotenv.config();
const { Student, Assignment, Result, Class } = models;

const addExamResults = async () => {
    try {
        const students = await Student.findAll();
        const assignments = await Assignment.findAll();
        const classes = await Class.findAll();

        let totalResultCount = 0;

        for (const student of students) {
            const studentClass = classes.find(cls => cls.id === student.class_id);
            if (!studentClass) continue;

            const studentAssignments = assignments.filter(assignment => assignment.class_id === studentClass.id);
            if (studentAssignments.length === 0) continue;

            let studentResultCount = 0;

            for (const assignment of studentAssignments) {
                const grade = faker.datatype.number({ min: 2, max: assignment.maxGrade });

                const result = new Result({
                    grade,
                    student_id: student.id,
                    assignment_id: assignment.id
                });

                await result.save();
                studentResultCount++;
                totalResultCount++;
                console.log(`Result for Student ${student.firstName} ${student.lastName} in Exam ${assignment.name} added to the database`);
            }
        }

        console.log(`Total ${totalResultCount} assignment results added to the database.`);
    } catch (err) {
        console.log(`Error: ${err}`);
    }
};

addExamResults();