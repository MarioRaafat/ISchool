'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Teachers', 'image', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Teachers', 'image');
  }
};
