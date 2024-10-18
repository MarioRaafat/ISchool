'use strict';
export default (sequelize, DataTypes) => {
	const Student = sequelize.define('Student', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		gender: DataTypes.STRING,
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		phone: DataTypes.STRING
	}, {
		indexes: [
			{
				unique: true,
				fields: ['email']
			}
		],
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