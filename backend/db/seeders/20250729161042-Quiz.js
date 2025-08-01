'use strict';

/** @type {import('sequelize-cli').Migration} */
const { Quiz } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Quiz.bulkCreate([
      {
        title: 'Quiz 1',
        due_date: new Date('2025-08-01T06:00:00'),
        description: `Dear Students, it's a kind reminder regarding the quiz due date.`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {validate: true});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Quizzes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: ['Quiz 1'] }
    }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
