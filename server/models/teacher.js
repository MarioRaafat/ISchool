'use strict';
export default (sequelize, DataTypes) => {
	const Teacher = sequelize.define('Teacher', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		name: DataTypes.STRING,
		gender: DataTypes.STRING,
		password: DataTypes.STRING,
		email: {
			type: DataTypes.STRING,
			unique: true
		},
		phone: DataTypes.STRING
	}, {});
	Teacher.associate = function (models) {
		// associations can be defined here
		Teacher.belongsToMany(models.Class, { through: 'class_teachers' });
	};
	return Teacher;
};