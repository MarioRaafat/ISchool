'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Results', 'assignment_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'Assignments',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Results', 'assignment_id');
  }
};