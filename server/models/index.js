import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import Teacher from './teacher.js';
import Grade from './grade.js';
import Class from './class.js';
import Student from './student.js';
import Subject from './subject.js';
import Assignment from './assignment.js';
import Exam from './exam.js';
import Result from './result.js';
import ClassSubjects from './class_subjects.js';
import ClassTeachers from './class_teachers.js';
import TeacherSubjects from './teacher_subjects.js';
import pg from 'pg'; // Import the pg module

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres',
	protocol: 'postgres',
	dialectModule: pg, // Explicitly specify the pg module
	logging: false,
});

const models = {
	Teacher: Teacher(sequelize, DataTypes),
	Grade: Grade(sequelize, DataTypes),
	Class: Class(sequelize, DataTypes),
	Student: Student(sequelize, DataTypes),
	Subject: Subject(sequelize, DataTypes),
	Assignment: Assignment(sequelize, DataTypes),
	Exam: Exam(sequelize, DataTypes),
	Result: Result(sequelize, DataTypes),
	ClassSubjects: ClassSubjects(sequelize, DataTypes),
	ClassTeachers: ClassTeachers(sequelize, DataTypes),
	TeacherSubjects: TeacherSubjects(sequelize, DataTypes),
};

Object.keys(models).forEach((modelName) => {
	if (models[modelName].associate) {
		models[modelName].associate(models);
	}
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
