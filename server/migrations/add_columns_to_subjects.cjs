'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('Subjects', 'startTime', {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: null,
		});
		await queryInterface.addColumn('Subjects', 'endTime', {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: null,
		});
		await queryInterface.addColumn('Subjects', 'day', {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: null,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn('Subjects', 'startTime');
		await queryInterface.removeColumn('Subjects', 'endTime');
		await queryInterface.removeColumn('Subjects', 'day');
	}
};
