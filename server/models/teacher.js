// server/models/teacher.js
'use strict';
export default (sequelize, DataTypes) => {
	const Teacher = sequelize.define('Teacher', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		gender: DataTypes.STRING,
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		phone: DataTypes.STRING,
		image: DataTypes.STRING,
		teachingYears: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		lessonsTaught: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		}
	}, {
		indexes: [
			{
				unique: true,
				fields: ['email']
			}
		]
	});
	Teacher.associate = function (models) {
		Teacher.belongsToMany(models.Class, { through: 'ClassTeachers', as: 'Classes', foreignKey: 'teacher_id' });
		Teacher.belongsToMany(models.Subject, { through: 'TeacherSubjects', as: 'Subjects', foreignKey: 'teacher_id' });
	};
	return Teacher;
};