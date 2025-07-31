'use strict';

/** @type {import('sequelize-cli').Migration} */
const { Student } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Student.bulkCreate([
          {
            first_name: 'Shir Hussain',
            last_name: 'Tabesh',
            email: 'shtabesh@bu.edu',
          },
          {
            first_name: 'Sharif',
            last_name: 'Rezaie',
            email: 'shtabesh02@yahoo.com',
          },
        ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Students';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      email: { [Op.in]: ['shtabesh@bu.edu', 'shtabesh02@yahoo.com'] }
    }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
