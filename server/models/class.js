// server/models/class.js
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
		Class.belongsTo(models.Grade, { foreignKey: 'grade_id', as: 'Grade' });
		Class.hasMany(models.Student, { as: 'Students', foreignKey: 'class_id' });
		Class.belongsToMany(models.Teacher, { through: 'class_teachers', as: 'Teachers' });
		Class.belongsToMany(models.Subject, { through: 'class_subjects', as: 'Subjects' });
	};
	return Class;
};