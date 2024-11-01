'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('Teachers', 'teachingYears', {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		});
		await queryInterface.addColumn('Teachers', 'lessonsTaught', {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn('Teachers', 'teachingYears');
		await queryInterface.removeColumn('Teachers', 'lessonsTaught');
	}
};