'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable('TeacherSubjects');
    if (tableDescription.subjectId) {
      await queryInterface.renameColumn('TeacherSubjects', 'subjectId', 'subject_id');
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable('TeacherSubjects');
    if (tableDescription.subject_id) {
      await queryInterface.renameColumn('TeacherSubjects', 'subject_id', 'subjectId');
    }
  }
};