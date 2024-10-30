'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('ClassTeachers', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			class_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Classes',
					key: 'id'
				},
				onDelete: 'CASCADE'
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
		await queryInterface.dropTable('ClassTeachers');
	}
};