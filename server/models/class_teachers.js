
// server/models/class_teacher.js
export default (Sequelize, DataTypes) => {
	const ClassTeachers = Sequelize.define('ClassTeachers',
		{
			class_id: {
				type: DataTypes.UUID,
				allowNull: false,
				references: {
					model: 'Classes',
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
		},
		{
			timestamps: true
		}
	);
	ClassTeachers.associate = function (models) {
		ClassTeachers.belongsTo(models.Class, { foreignKey: 'class_id', as: 'Class' });
		ClassTeachers.belongsTo(models.Teacher, { foreignKey: 'teacher_id', as: 'Teacher' });
	};
	return ClassTeachers;
};