// server/models/class_subjects.js
'use strict';
export default (sequelize, DataTypes) => {
	const ClassSubjects = sequelize.define('ClassSubjects', {
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
	ClassSubjects.associate = function (models) {
		ClassSubjects.belongsTo(models.Class, { foreignKey: 'class_id', as: 'Class' });
		ClassSubjects.belongsTo(models.Subject, { foreignKey: 'subject_id', as: 'Subject' });
	};
	return ClassSubjects;
};