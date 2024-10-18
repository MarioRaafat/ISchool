'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('Assignments', 'description', {
			type: Sequelize.TEXT,
			allowNull: true,
		});
		await queryInterface.addColumn('Assignments', 'filePath', {
			type: Sequelize.STRING,
			allowNull: true,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn('Assignments', 'description');
		await queryInterface.removeColumn('Assignments', 'filePath');
	}
};