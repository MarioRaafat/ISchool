'use strict';
export default (sequelize, DataTypes) => {
	const Result = sequelize.define('Result', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		score: DataTypes.INTEGER,
		exam_id: DataTypes.UUID,
		assignment_id: DataTypes.UUID,
		student_id: DataTypes.UUID
	}, {});
	Result.associate = function (models) {
		// associations can be defined here
		Result.belongsTo(models.Exam, { foreignKey: 'exam_id' });
		Result.belongsTo(models.Assignment, { foreignKey: 'assignment_id' });
		Result.belongsTo(models.Student, { foreignKey: 'student_id' });
	};
	return Result;
};