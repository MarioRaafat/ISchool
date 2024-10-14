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
		// associations can be defined here
		Grade.hasMany(models.Class);
		Grade.hasMany(models.Student);
		Grade.hasMany(models.Subject);
	};
	return Grade;
};