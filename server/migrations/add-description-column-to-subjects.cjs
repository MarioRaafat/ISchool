'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Subjects', 'description', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Subjects', 'description');
  }
};
