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

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres',
	protocol: 'postgres',
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
};

Object.keys(models).forEach((modelName) => {
	if (models[modelName].associate) {
		models[modelName].associate(models);
	}
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;