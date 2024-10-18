'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('Exams', 'description', {
			type: Sequelize.TEXT,
			allowNull: true,
		});
		await queryInterface.addColumn('Exams', 'filePath', {
			type: Sequelize.STRING,
			allowNull: true,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn('Exams', 'description');
		await queryInterface.removeColumn('Exams', 'filePath');
	}
};