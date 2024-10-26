// server/models/exam.js
'use strict';
export default (sequelize, DataTypes) => {
	const Exam = sequelize.define('Exam', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		name: DataTypes.STRING,
		date: DataTypes.STRING,
		maxGrade: DataTypes.INTEGER,
		description: DataTypes.TEXT,
		teacher_id: DataTypes.UUID,
		class_id: DataTypes.UUID
	}, {});
	Exam.associate = function (models) {
		Exam.belongsTo(models.Teacher, { foreignKey: 'teacher_id', as: 'Teacher' });
		Exam.belongsTo(models.Class, { foreignKey: 'class_id', as: 'Class' });
	};
	return Exam;
};