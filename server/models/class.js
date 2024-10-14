'use strict';
export default (sequelize, DataTypes) => {
	const Class = sequelize.define('Class', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		name: DataTypes.STRING,
		grade_id: DataTypes.UUID
	}, {});
	Class.associate = function (models) {
		// associations can be defined here
		Class.belongsTo(models.Grade, { foreignKey: 'grade_id' });
		Class.hasMany(models.Student);
		Class.belongsToMany(models.Teacher, { through: 'class_teachers' });
		Class.belongsToMany(models.Subject, { through: 'class_subjects' });
	};
	return Class;
};