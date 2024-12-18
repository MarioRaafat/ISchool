// server/models/assignment.js
'use strict';
export default (sequelize, DataTypes) => {
	const Assignment = sequelize.define('Assignment', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		name: DataTypes.STRING,
		startDate: DataTypes.STRING,
		endDate: DataTypes.STRING,
		maxGrade: DataTypes.INTEGER,
		description: DataTypes.TEXT,
		filePath: DataTypes.STRING,
		teacher_id: DataTypes.UUID,
		class_id: DataTypes.UUID
	}, {});
	Assignment.associate = function (models) {
		Assignment.belongsTo(models.Teacher, { foreignKey: 'teacher_id', as: 'Teacher' });
		Assignment.belongsTo(models.Class, { foreignKey: 'class_id', as: 'Class' });
	};
	return Assignment;
};