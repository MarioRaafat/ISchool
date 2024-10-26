// server/models/grade.js
'use strict';
export default (sequelize, DataTypes) => {
	const Grade = sequelize.define('Grade', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		level: DataTypes.INTEGER
	}, {});
	Grade.associate = function (models) {
		Grade.hasMany(models.Class, { as: 'Classes', foreignKey: 'grade_id' });
		Grade.hasMany(models.Student, { as: 'Students', foreignKey: 'grade_id' });
		Grade.hasMany(models.Subject, { as: 'Subjects', foreignKey: 'grade_id' });
	};
	return Grade;
};