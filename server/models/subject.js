'use strict';
export default (sequelize, DataTypes) => {
	const Subject = sequelize.define('Subject', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		name: DataTypes.STRING,
		grade_id: DataTypes.UUID
	}, {});
	Subject.associate = function (models) {
		// associations can be defined here
		Subject.belongsTo(models.Grade, { foreignKey: 'grade_id' });
		Subject.belongsToMany(models.Class, { through: 'class_subjects' });
	};
	return Subject;
};