'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('ClassTeachers', 'subject_id', {
			type: Sequelize.UUID,
			allowNull: false,
			references: {
				model: 'Subjects',
				key: 'id'
			},
			onDelete: 'CASCADE'
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn('ClassTeachers', 'subject_id');
	}
};