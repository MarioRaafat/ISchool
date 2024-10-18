'use strict';
export default (sequelize, DataTypes) => {
	const Exam = sequelize.define('Exam', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		name: DataTypes.STRING,
		startTime: DataTypes.STRING,
		endTime: DataTypes.STRING,
		maxGrade: DataTypes.INTEGER,
		description: DataTypes.TEXT, // Add description column
		filePath: DataTypes.STRING, // Add filePath column
		teacher_id: DataTypes.UUID,
		class_id: DataTypes.UUID
	}, {});
	Exam.associate = function (models) {
		// associations can be defined here
		Exam.belongsTo(models.Teacher, { foreignKey: 'teacher_id' });
		Exam.belongsTo(models.Class, { foreignKey: 'class_id' });
	};
	return Exam;
};