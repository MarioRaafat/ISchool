// server/models/class_subjects.js
'use strict';
export default (sequelize, DataTypes) => {
	const ClassSubjects = sequelize.define('ClassSubjects', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		class_id: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'Classes',
				key: 'id'
			},
			onDelete: 'CASCADE'
		},
		subject_id: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'Subjects',
				key: 'id'
			},
			onDelete: 'CASCADE'
		}
	}, {
		timestamps: true
	});

	// Explicitly define associations with the correct foreign key options
	ClassSubjects.associate = function (models) {
		ClassSubjects.belongsTo(models.Class, { foreignKey: 'class_id', as: 'Class' });
		ClassSubjects.belongsTo(models.Subject, { foreignKey: 'subject_id', as: 'Subject' }); // Ensure the foreign key is specified here
	};
	return ClassSubjects;
};
