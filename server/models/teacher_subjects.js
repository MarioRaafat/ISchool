// server/models/teacher_subjects.js
'use strict';
export default (sequelize, DataTypes) => {
	const TeacherSubjects = sequelize.define('TeacherSubjects', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		subject_id: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'Subjects',
				key: 'id'
			},
			onDelete: 'CASCADE'
		},
		teacher_id: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'Teachers',
				key: 'id'
			},
			onDelete: 'CASCADE'
		},
	}, {
		timestamps: true
	});
	TeacherSubjects.associate = function (models) {
		TeacherSubjects.belongsTo(models.Teacher, { foreignKey: 'teacher_id', as: 'Teacher' });
		TeacherSubjects.belongsTo(models.Subject, { foreignKey: 'subject_id', as: 'Subject' });
	};
	return TeacherSubjects;
};