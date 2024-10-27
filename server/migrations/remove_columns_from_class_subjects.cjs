'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn('class_subjects', 'startTime');
		await queryInterface.removeColumn('class_subjects', 'endTime');
		await queryInterface.removeColumn('class_subjects', 'day');
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('class_subjects', 'startTime', {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: null,
		});
		await queryInterface.addColumn('class_subjects', 'endTime', {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: null,
		});
		await queryInterface.addColumn('class_subjects', 'day', {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: null,
		});
	}
};