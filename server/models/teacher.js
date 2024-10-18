'use strict';
export default (sequelize, DataTypes) => {
	const Teacher = sequelize.define('Teacher', {
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
		]
	});
	Teacher.associate = function (models) {
		// associations can be defined here
		Teacher.belongsToMany(models.Class, { through: 'class_teachers' });
	};
	return Teacher;
};