'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('TeacherSubjects', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			teacher_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Teachers',
					key: 'id'
				},
				onDelete: 'CASCADE'
			},
			subject_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Subjects',
					key: 'id'
				},
				onDelete: 'CASCADE'
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('TeacherSubjects');
	}
};