'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('Exams', 'startDate', {
			type: Sequelize.DATE,
			allowNull: true,
		});
		await queryInterface.addColumn('Exams', 'endDate', {
			type: Sequelize.DATE,
			allowNull: true,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn('Exams', 'startDate');
		await queryInterface.removeColumn('Exams', 'endDate');
	}
};