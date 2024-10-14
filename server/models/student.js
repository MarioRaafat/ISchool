'use strict';
export default (sequelize, DataTypes) => {
	const Student = sequelize.define('Student', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		name: DataTypes.STRING,
		gender: DataTypes.STRING,
		email: {
			type: DataTypes.STRING,
			unique: true
		},
		password: DataTypes.STRING,
		class_id: DataTypes.UUID,
		grade_id: DataTypes.UUID
	}, {});
	Student.associate = function (models) {
		// associations can be defined here
		Student.belongsTo(models.Class, { foreignKey: 'class_id' });
		Student.belongsTo(models.Grade, { foreignKey: 'grade_id' });
	};
	return Student;
};