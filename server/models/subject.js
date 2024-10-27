// server/models/subject.js
'use strict';
export default (sequelize, DataTypes) => {
	const Subject = sequelize.define('Subject', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		name: DataTypes.STRING,
		grade_id: DataTypes.UUID,
		description: DataTypes.TEXT,
		time: DataTypes.STRING,
		description: DataTypes.TEXT,
		startTime: DataTypes.STRING,
		endTime: DataTypes.STRING,
		day: DataTypes.STRING
	}, {});
	Subject.associate = function (models) {
		Subject.belongsTo(models.Grade, { foreignKey: 'grade_id', as: 'Grade' });
		Subject.belongsToMany(models.Class, { through: 'class_subjects', as: 'Classes' });
	};
	return Subject;
};