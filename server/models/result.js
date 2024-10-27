// server/models/result.js
'use strict';
export default (sequelize, DataTypes) => {
	const Result = sequelize.define('Result', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		grade: DataTypes.INTEGER,
		student_id: DataTypes.UUID,
		exam_id: DataTypes.UUID
	}, {});
	Result.associate = function (models) {
		Result.belongsTo(models.Student, { foreignKey: 'student_id', as: 'Student' });
		Result.belongsTo(models.Exam, { foreignKey: 'exam_id', as: 'Exam' });
	};
	return Result;
};