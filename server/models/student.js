// server/models/student.js
'use strict';
export default (sequelize, DataTypes) => {
	const Student = sequelize.define('Student', {
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
		class_id: {
			type: DataTypes.UUID,
			allowNull: true,
			references: {
				model: 'Classes',
				key: 'id'
			},
			onDelete: 'SET NULL'
		},
		grade_id: DataTypes.UUID,
		image: DataTypes.STRING
	}, {});
	Student.associate = function (models) {
		Student.belongsTo(models.Class, { foreignKey: 'class_id', as: 'Class' });
		Student.belongsTo(models.Grade, { foreignKey: 'grade_id', as: 'Grade' });
	};
	return Student;
};