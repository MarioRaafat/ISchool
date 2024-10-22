'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Students', 'image', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Students', 'image');
  }
};
